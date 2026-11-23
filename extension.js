import Gio from 'gi://Gio';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';

const IFACE_XML = `
<node>
  <interface name="com.berelx.LayoutSwitcher">
    <method name="SetLayout">
      <arg name="layout" type="s" direction="in"/>
      <arg name="success" type="b" direction="out"/>
    </method>

    <method name="GetCurrentLayout">
      <arg name="layout" type="s" direction="out"/>
    </method>

    <method name="ListLayouts">
      <arg name="layouts" type="as" direction="out"/>
    </method>
  </interface>
</node>
`;

export default class LayoutSwitcherExtension extends Extension {

    enable() {

        this._dbus = Gio.DBusExportedObject.wrapJSObject(
            IFACE_XML,
            this
        );

        this._dbus.export(
            Gio.DBus.session,
            "/com/berelx/LayoutSwitcher"
        );

        Gio.DBus.session.own_name(
            "com.berelx.LayoutSwitcher",
            Gio.BusNameOwnerFlags.NONE,
            null,
            null
        );

        log("LayoutSwitcher enabled");
    }

    disable() {

        if (this._dbus) {
            this._dbus.unexport();
            this._dbus = null;
        }

        log("LayoutSwitcher disabled");
    }

    _manager() {
        return Main.panel.statusArea.keyboard._inputSourceManager;
    }

    SetLayout(layout) {

        try {

            const manager = this._manager();

            const sources =
                Object.values(manager.inputSources);

            for (const source of sources) {

                const id = source.id ?? "";

                if (
                    id.includes(`+${layout}`) ||
                    id === layout ||
                    id.startsWith(layout)
                ) {

                    source.activate();

                    return true;
                }
            }

            return false;

        } catch (e) {

            logError(e);

            return false;
        }
    }

    GetCurrentLayout() {

        try {

            const manager = this._manager();

            return manager.currentSource?.id ?? "";

        } catch (e) {

            logError(e);

            return "";
        }
    }

    ListLayouts() {

        try {

            const manager = this._manager();

            return Object
                .values(manager.inputSources)
                .map(s => s.id);

        } catch (e) {

            logError(e);

            return [];
        }
    }
}