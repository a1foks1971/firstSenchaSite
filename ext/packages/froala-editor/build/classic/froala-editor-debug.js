/**
 * Private class used by {@link Ext.froala.Editor} and {@link Ext.froala.EditorField}.
 * If you use this mixin, your class must override component methods handed here:
 * - doAddListener -> handleAddListener
 * - doRemoveListener -> handleRemoveListener
 * - updateValue
 * See source for Ext.froala.Editor or EditorField for examples.
 */
Ext.define('Ext.froala.Mixin', {
    extend: 'Ext.Mixin',
    twoWayBindable: [
        'value'
    ],
    defaultBindProperty: 'value',
    config: {
        /**
         * @cfg {String} activationKey The Froala activation key. If specified, this
         * take precedence over the activation key configured in your application's
         * `app.json`.
         */
        activationKey: undefined,
        /**
         * @cfg {Object} defaultEditor The default Froala editor configs passed to the Froala
         * constructor. This value is merged with the {@link #editor} config you specify. This can
         * only be specified at time of creation and cannot be set later.
         */
        defaultEditor: {
            iconsTemplate: 'font_awesome_5'
        },
        /**
         * @cfg {String} value
         * The text content of the editor.
         */
        value: '',
        /**
         * A Froala config object as documented at
         * https://www.froala.com/wysiwyg-editor/docs/options
         * This config is set once, upon creation of the FroalaEditor and cannot be updated later.
         * The most commonly provided value is `toolbarButtons`, which defaults to
         * editor: {
         *    toolbarButtons: {
         *     'moreText': {
         *     'buttons': ['bold', 'italic', 'underline', 'strikeThrough',
         *       'subscript', 'superscript', 'fontFamily',
         *       'fontSize', 'textColor', 'backgroundColor', 'inlineClass',
         *       'inlineStyle', 'clearFormatting'
         *      ]
         *     },
         *     'moreParagraph': {
         *       'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight',
         *           'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle',
         *           'lineHeight', 'outdent', 'indent', 'quote'
         *        ]
         *     },
         *   'moreRich': {
         *     'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable',
         *       'emoticons', 'fontAwesome', 'specialCharacters', 'embedly',
         *       'insertFile', 'insertHR'
         *      ]
         *   },
         *   'moreMisc': {
         *     'buttons': ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker',
         *       'selectAll', 'html', 'help'
         *      ],
         *     'align': 'right',
         *     'buttonsVisible': 2
         *   }
         * }
         * }
         */
        editor: {}
    },
    ariaRole: 'texteditor',
    /**
     * @property {Boolean} isFroalaEditor
     * Identifies this class and its subclasses.
     * @readonly
     */
    isFroalaEditor: true,
    /**
     * @property {Boolean} isReady
     * Flags whether the Froala editor instance has been initialized. Initialization
     * happens automatically when the component is created, but takes several milliseconds.
     * Upon initialization, the {@link #event-ready} event is fired.
     * @readonly
     */
    isReady: false,
    onFroalaContentChanged: function() {
        var me = this;
        if (Ext.isFunction(me.publishValue)) {
            me.publishValue();
        } else {
            me.setValue(me.getEditor().html.get());
        }
    },
    createFroalaEditor: function(config, froalaEl) {
        var me = this,
            defaultConfig = me.getDefaultEditor(),
            options, froalaEditor, value,
            key = Ext.manifest.froala,
            froalaEditorDomElement = froalaEl || me.getFroalaEditorDomElement(),
            bufferedChangedEvent = Ext.Function.createBuffered(me.onFroalaContentChanged, 50, me);
        // bufferedChangedEvent avoids running the change event more often than necessary.
        options = Ext.merge(me.getEditor(), defaultConfig);
        if (config.events) {
            options.events = config.events;
        }
        key = me.getActivationKey() || (key && key['activation-key']);
        if (key) {
            options.key = key;
        }
        froalaEditor = new FroalaEditor(froalaEditorDomElement, options, function() {
            value = config.value || me.getValue();
            froalaEditor.component = me;
            me.monitorConfiguredListeners();
            froalaEditor.isReady = true;
            me.fireEvent('ready', me, froalaEditor);
            froalaEditor.events.on('contentChanged', bufferedChangedEvent);
            froalaEditor.html.set(value);
            if (!me.activeErrorsTpl && me.xtype === 'froalaeditorfield') {
                me.activeErrorsTpl = me.htmlActiveErrorsTpl;
                me.setActiveError(config.activeError);
            }
            me.initialValue = me.originalValue = me.lastValue = value;
        });
        froalaEditor.isReady = false;
        return froalaEditor;
    },
    updateValue: function(value) {
        var me = this,
            editor = me.getEditor(),
            editorValue;
        if (editor && editor.isReady) {
            me.fireEvent('change', me, value);
            editorValue = editor.snapshot.get().html || editor.html.get();
            // The value won't change if it came from
            // onFroalaContentChanged. Otherwise, someone
            // ran setValue() on the component and the
            // editor's html has to reflect that.
            if (value !== editorValue) {
                editor.html.set(value);
                if (Ext.isFunction(me.publishValue)) {
                    me.publishValue();
                }
            }
        }
    },
    updateDisabled: function(disabled) {
        var editor = this.getEditor();
        if (editor) {
            editor.edit[disabled ? 'off' : 'on']();
        }
    },
    privates: {
        /**
         * Set up Froalaq events specified in the listeners:{} block. 
         * For non-Froala events, using listeners:{} works fine. But 
         * for Froala events, we have to wait until aftr the Froala 
         * instance is created before we can add listeners to it. This
         * method is run one time, immediately after the Froala 
         * instance has been created.
         */
        monitorConfiguredListeners: function(froalaEditor) {
            // Assert: froalaListenersConfig has been inialized with 
            // the original Froala event names (which may be camel-case).
            // By the time we get here, the ExtJS framework takes the
            // names from listeners:{} and puts then into hasListeners,
            // which are all lower case. froalaListenersConfigNames maps
            // the lowercase name to the original name
            var me = this,
                originalName,
                eventNames = Object.keys(me.hasListeners);
            eventNames.forEach(function(event) {
                if (me.isFroalaEvent(event)) {
                    originalName = me.froalaListenersConfigNames[event];
                    me.setupListener(originalName);
                }
            });
        },
        froalaNamePrefixRe: /froala\./,
        /**
         * @param {String} event - The event name being checked.
         * @returns {Boolean} true if the event is a Froala event.
         */
        isFroalaEvent: function(event) {
            return !!event.match(this.froalaNamePrefixRe);
        },
        translateFroalaEventName: function(event) {
            return event.replace(this.froalaNamePrefixRe, '');
        },
        setupListener: function(event) {
            var me = this,
                froalaEditor = me.getEditor(),
                translatedFroalaEventName, froalaEventsBeingMonitored;
            // This method is called from two places:
            // - When a listener is added procedurally, via on(), after the
            //   Froala editor instance exists.
            // - One time immediately after the Froala editor instance is
            //   created, in order to add the items in listeners:{}
            // 
            // Upon entry, the event has already been added to this Observable.
            // But for Froala events, we need to add a listener to the Froala
            // instance. If it's not a Froala event, just ignore it and the
            // event will get fired in the normal way. 
            if (!me.isFroalaEvent(event)) {
                return;
            }
            // Add the event to Froala, passing an event handler. The handler
            // simply fires the event via Observable. That means we only need
            // to setup the Froala event once. The flow is: Froala detects the
            // event, Froala calls the one event handler which then fires the
            // event, and Observable takes care of informing all listeners.
            froalaEventsBeingMonitored = me.getFroalaEventsBeingMonitored();
            if (!froalaEventsBeingMonitored[event]) {
                translatedFroalaEventName = me.translateFroalaEventName(event);
                froalaEditor.events.on(translatedFroalaEventName, createHandler(event, me));
                froalaEventsBeingMonitored[event] = true;
            }
            function createHandler(name) {
                // Return the froala event handler. The event handler simply
                // fires the component event via fireEventArgs(), using the
                // name in closure scope. This component is passed as the
                // first argument, followed by the Froala arguments.
                return function() {
                    var args = Array.prototype.slice.call(arguments);
                    args.unshift(me);
                    me.fireEventArgs(name, args);
                };
            }
        },
        handleAddListener: function(ename) {
            var me = this,
                froalaEditor, isBeingRunFromListenersConfig;
            if (!me.isFroalaEvent(ename)) {
                return;
            }
            // This method is called by the overridden doAddListener
            // from Editor or EditorField. It's run whenever a listener
            // is being added, either via a listeners:{} config or via
            // view.on(). If this is called after initialization (and
            // froalaEditor.isReady is true), then set up the Foala 
            // listener with the editor instance. But if it's run via 
            // the component config, and therefore, before the editor
            // exists, then we need to remember the event name and add
            // it later, after the editor is created. That's done in
            // monitorConfiguredListeners().
            froalaEditor = me.getEditor();
            isBeingRunFromListenersConfig = !(froalaEditor && froalaEditor.isReady);
            if (isBeingRunFromListenersConfig) {
                // ename may be camel-case. But when ExtJS initialized listeners:{}
                // and updates hasListeners, those events are changed to lowercase.
                // Therefore, save the lowercase name and associate it with the original
                // name.
                me.froalaListenersConfigNames[ename.toLowerCase()] = ename;
            } else {
                me.setupListener(ename);
            }
        },
        froalaListenersConfigNames: {},
        handleRemoveListener: function(ename) {
            var me = this,
                froalaEditor = me.getEditor();
            if (!(froalaEditor && froalaEditor.isReady)) {
                return;
            }
            // If this is an event we're monitoring on the Froala instance,
            // but there are no longer any listeners, then tell Froala to stop
            // monitored.
            if (me.isFroalaEvent(ename)) {
                if (!me.hasListeners[ename]) {
                    // TODO: A future release of Froala will have an "off()" event,
                    // used to remove an event listener. When that's addded, use
                    // this code to clean up listeners. This is un-tested code.
                    // froalaEditor.events.off(ename);
                    delete me.getFroalaEventsBeingMonitored()[ename];
                }
            }
        },
        getFroalaEventsBeingMonitored: function() {
            return (this.froalaEventsBeingMonitored = this.froalaEventsBeingMonitored || {});
        }
    },
    getFroalaEditorDomElement: function() {
        Ext.raise('getFroalaEditorDomElement must be overridden in the class using froala/Mixins');
    }
});

/**
 * Wraps Froala Editor. [Froala Editor](https://www.froala.com/wysiwyg-editor).
 *
 * When the component is created, the Froala editor instance gets initialized, which
 * takes several milliseconds. Use the {@link #ready} event to know when it's
 * ready.
 *
 * To run native Froala methods, access the Froala editor instance via
 * {@link #method-getEditor}. For example,
 * `myFroalaComponent.getEditor().popups.show('froala.hello', 30, 60, 200);`
 *
 * Native Froala events are available by prefixing the event name with "froala.".
 * For example, you can listen to the Froala click event via
 * `myFroalaComponent.on('froala.click', function(){console.log('click');});`
 *
 * ## Example
 *
 *     @example
 *     Ext.define('Example.main.Main', {
 *         extend: 'Ext.Panel',
 *         requires: ['Ext.froala.Editor'],
 *         layout: 'fit',
 *         items: [{
 *             xtype: 'froalaeditor',
 *             value: 'Hello world!',
 *             listeners: {
 *                 change: function (froalaComponent) {
 *                     Ext.toast({
 *                         message: "Change!"
 *                     });
 *                 },
 *                 // Native Froala events are prefixed with 'froala.'
 *                 "froala.click": function (froalaComponent) {
 *                     Ext.toast({
 *                         message: "Click!"
 *                     });
 *                 }
 *             }
 *         }]
 *     });
 *
 *     Ext.application({
 *         name: 'Example',
 *         mainView: 'Example.main.Main'
 *     });
 *
 * If you have a Froala activation key, configure it in your application's `app.json`
 *
 *       {
 *          "name": "MyApp",
 *          "namespace": "MyApp",
 *          "framework": "ext",
 *          "requires": ["font-awesome", "froala-editor"],
 *          "froala" {
 *              "activation-key": "my-activation-key"
 *           }
 *          ...
 *       }
 *
 * For more information about activation keys, please visit [What is an Activation Key?](https://wysiwyg-editor.froala.help/hc/en-us/articles/115000394945-What-is-an-Activation-Key-).
 */
Ext.define('Ext.froala.Editor', {
    extend: 'Ext.Component',
    xtype: 'froalaeditor',
    mixins: {
        froalaeditor: 'Ext.froala.Mixin'
    },
    renderTpl: [
        '<div id="{id}-editorElement" data-ref="editorElement"></div>'
    ],
    childEls: [
        'editorElement'
    ],
    twoWayBindable: [
        'value'
    ],
    defaultBindProperty: 'value',
    baseCls: Ext.baseCSSPrefix + 'froala',
    /**
     * @event change
     * Fired when the html content changes
     * @param {Ext.froala.Editor} this This component.
     * @param {String} the html content.
     */
    /**
     * @event ready
     * Fired after the FroalaEditor instance is initialized.
     * @param {Ext.froala.Editor} this This component.
     * @param {Object} the FroalaEditor instance.
     */
    afterRender: function() {
        var me = this,
            config = Ext.clone(me.config, false),
            editor;
        me.callParent();
        delete config.$initParent;
        editor = me.mixins.froalaeditor.createFroalaEditor.call(me, [
            config
        ]);
        me.setEditor(editor);
    },
    updateValue: function(value) {
        this.mixins.froalaeditor.updateValue.call(this, value);
    },
    getFroalaEditorDomElement: function() {
        return this.editorElement.dom;
    },
    doDestroy: function() {
        this.setEditor(null);
        this.callParent();
    },
    updateDisabled: function(disabled) {
        this.mixins.froalaeditor.updateDisabled.call(this, disabled);
    },
    privates: {
        // Overrides a private method in Ext.mixin.Observable
        doAddListener: function(ename) {
            var me = this,
                result;
            result = me.callParent(arguments);
            me.mixins.froalaeditor.handleAddListener.call(me, ename);
            return result;
        },
        // Overrides a private method in Ext.mixin.Observable
        doRemoveListener: function(ename) {
            var me = this,
                result;
            result = me.callParent(arguments);
            me.mixins.froalaeditor.handleRemoveListener.call(me, ename);
            return result;
        }
    }
});

/**
 * A field version of [Froala Editor](https://www.froala.com). This allows you to use the Froala Editor
 * within a form and automatically have its name and value included in a form submit.
 */
Ext.define('Ext.froala.EditorField', {
    extend: 'Ext.form.field.Base',
    xtype: 'froalaeditorfield',
    mixins: {
        froalaeditor: 'Ext.froala.Mixin'
    },
    twoWayBindable: [
        'value'
    ],
    defaultBindProperty: 'value',
    blankText: 'This field is required',
    allowBlank: true,
    baseCls: Ext.baseCSSPrefix + 'froala',
    /**
     * @event change
     * Fired when the html content changes
     * @param {Ext.froala.EditorField} this This component.
     * @param {String} the html content.
     */
    /**
     * @event ready
     * Fired after the FroalaEditor instance is initialized.
     * @param {Ext.froala.EditorField} this This component.
     * @param {Object} the FroalaEditor instance.
     */
    fieldSubTpl: [
        // note: {id} here is really {inputId}, but {cmpId} is available
        '<div id="{id}" data-ref="inputEl" {inputAttrTpl} class="{fieldCls}',
        '<tpl if="name"> name="{name}"</tpl>',
        '<tpl if="value"> value="{[Ext.util.Format.htmlEncode(values.value)]}"</tpl>',
        '<tpl if="placeholder"> placeholder="{placeholder}"</tpl>',
        '{%if (values.maxLength !== undefined){%} maxlength="{maxLength}"{%}%}',
        '<tpl if="readOnly"> readonly="readonly"</tpl>',
        '<tpl if="disabled"> disabled="disabled"</tpl>',
        '<tpl if="tabIdx != null"> tabindex="{tabIdx}"</tpl>',
        '<tpl if="fieldStyle"> style="{fieldStyle}"</tpl>',
        '<tpl if="ariaEl == \'inputEl\'">',
        '<tpl foreach="ariaElAttributes"> {$}="{.}"</tpl>',
        '</tpl>',
        '<tpl foreach="inputElAriaAttributes"> {$}="{.}"</tpl>',
        '></div>',
        {
            disableFormats: true
        }
    ],
    activeErrorsTpl: undefined,
    htmlActiveErrorsTpl: [
        '<tpl if="errors && errors.length">',
        '<ul class="{listCls}">',
        '<tpl for="errors"><li>{.}</li></tpl>',
        '</ul>',
        '</tpl>'
    ],
    getFroalaEditorDomElement: function() {
        return this.inputEl.dom;
    },
    initComponent: function() {
        var me = this;
        me.initiateFroala(arguments);
        me.callParent();
    },
    initiateFroala: function() {
        var me = this,
            config = me.config,
            editor;
        delete config.$initParent;
        // validate the field on undo and redo options
        if (!me.allowBlank) {
            config.events = {
                'commands.undo': function() {
                    me.validate();
                },
                'commands.redo': function() {
                    me.validate();
                    me.isValid();
                }
            };
        }
        me.froalaEl = new Ext.fly(document.createElement('div'));
        editor = me.mixins.froalaeditor.createFroalaEditor.call(me, config, me.froalaEl.dom);
        me.setEditor(editor);
    },
    afterRender: function() {
        var me = this,
            config = Ext.clone(me.config, false);
        delete config.$initParent;
        // to make form field borders align with froala
        me.addCls('curved-form-field-border');
        me.inputEl.appendChild(me.froalaEl.dom);
        // To validate field if value is binded
        if (!Ext.isEmpty(!me.allowBlank)) {
            me.validate();
        }
    },
    doDestroy: function() {
        this.setEditor(null);
        this.callParent();
    },
    setValue: function(value) {
        this.updateValue(value);
    },
    getValue: function() {
        var me = this,
            editor = me.editor,
            value;
        if (editor) {
            value = editor.el && editor.el.innerHTML;
            // There is &zerowidthspace; when ever we add and remove a character 
            // Hence removing any unwanted character while checking for the value.
            return value.replace(/[\u200B-\u200D\uFEFF]/g, '') === '<p><br></p>' ? '' : value;
        }
    },
    getRawValue: function() {
        var value = this.getValue();
        this.rawValue = value;
        return value;
    },
    getErrors: function(value) {
        var me = this,
            errors;
        value = this.getRawValue();
        errors = me.callParent([
            value
        ]);
        if (value.length < 1) {
            if (!me.allowBlank) {
                errors.push(me.blankText);
            }
        }
        return errors;
    },
    updateValue: function(value) {
        this.mixins.froalaeditor.updateValue.call(this, value);
    },
    updateDisabled: function(disabled) {
        this.mixins.froalaeditor.updateDisabled.call(this, disabled);
    },
    privates: {
        // Overrides a private method in Ext.mixin.Observable
        doAddListener: function(ename) {
            var me = this,
                result;
            // It's safer to use arguments here, since there are so
            // many ways listener parameters are used.
            result = me.callParent(arguments);
            me.mixins.froalaeditor.handleAddListener.call(me, ename);
            return result;
        },
        // Overrides a private method in Ext.mixin.Observable
        doRemoveListener: function(ename) {
            var me = this,
                result;
            // It's safer to use arguments here, since there are so
            // many ways listener parameters are used.
            result = me.callParent(arguments);
            me.mixins.froalaeditor.handleRemoveListener.call(me, ename);
            return result;
        },
        // to show invalid text on editor input element
        getActionEl: function() {
            return (this.editor ? Ext.get(this.editor.el) : this.el);
        }
    }
});

