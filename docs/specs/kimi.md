# Kimi Code CLI Spec (Plugins and Skills)

Last verified: 2026-06-24

## Primary sources

```
https://www.kimi.com/code/docs/en/kimi-code-cli/customization/plugins.html
```

## Plugin manifests

Kimi Code CLI plugins are directories or zip files with a manifest at one of:

```text
<plugin_root>/kimi.plugin.json
<plugin_root>/.kimi-plugin/plugin.json
```

When both exist, `kimi.plugin.json` takes precedence. Compound Engineering uses `.kimi-plugin/plugin.json` to match the repo's other platform-specific manifest directories.

Supported fields include:

| Field | CE usage |
| --- | --- |
| `name` | Required plugin id, set to `compound-engineering` |
| `version` | Root plugin version, bumped by release-please |
| `description`, `keywords`, `author`, `homepage`, `license` | Shared display metadata |
| `interface.displayName` | Marketplace/plugin manager display name |
| `interface.shortDescription` | Short plugin-manager copy |
| `interface.longDescription` | Longer plugin-manager copy |
| `interface.developerName` | Human-readable developer name |
| `interface.websiteURL` | Repository URL |
| `skills` | `./skills/`, resolved inside the plugin root |

CE does not currently declare `sessionStart.skill`, `skillInstructions`, or `mcpServers` for Kimi. Unsupported runtime fields such as `tools`, `commands`, `hooks`, `apps`, `inject`, and `configFile` are diagnostics-only in Kimi and should not be used for CE behavior.

## Marketplace catalog

Kimi also supports a custom marketplace JSON source. The catalog schema uses:

```json
{
  "version": "2",
  "plugins": [
    {
      "id": "compound-engineering",
      "displayName": "Compound Engineering",
      "source": "https://github.com/EveryInc/compound-engineering-plugin"
    }
  ]
}
```

The marketplace catalog has no release-owned `metadata.version` equivalent. Treat `.kimi-plugin/marketplace.json` as static parity data, not a separate release component. `release:validate` checks that its plugin ids match the Claude marketplace plugin names and that entries use installable sources.

## Install commands

Direct install from GitHub:

```text
/plugins install https://github.com/EveryInc/compound-engineering-plugin
```

Marketplace browsing:

```text
/plugins marketplace https://raw.githubusercontent.com/EveryInc/compound-engineering-plugin/main/.kimi-plugin/marketplace.json
```

After installing, enabling, disabling, or removing a plugin, Kimi requires `/reload` or a new session for changes to apply.
