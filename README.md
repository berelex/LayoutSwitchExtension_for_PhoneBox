1. Create work directory: `mkdir -p ~/.local/share/gnome-shell/extensions/layoutswitch@berelex`
2. Copy `metadata.json` and `extension.js`
3. Add extension: `gnome-extensions enable layoutswitch@berelex` (or Extensions application)
4. Log Out GNOME session
5. Check service:
 * Layout list:

```bash
gdbus call \
--session \
--dest com.berelx.LayoutSwitcher \
--object-path /com/berelx/LayoutSwitcher \
--method com.berelx.LayoutSwitcher.ListLayouts
```

* Current Layout:
  
```bash
gdbus call \
--session \
--dest com.berelx.LayoutSwitcher \
--object-path /com/berelx/LayoutSwitcher \
--method com.berelx.LayoutSwitcher.GetCurrentLayout
```

* Switch to Russian layout:

```bash
gdbus call \
--session \
--dest com.berelx.LayoutSwitcher \
--object-path /com/berelx/LayoutSwitcher \
--method com.berelx.LayoutSwitcher.SetLayout ru
```

* Switch to English layout:

```bash
gdbus call \
--session \
--dest com.berelx.LayoutSwitcher \
--object-path /com/berelx/LayoutSwitcher \
--method com.berelx.LayoutSwitcher.SetLayout us
```

* e.t.c.
