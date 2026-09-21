# Hero Behaviors

- Interaction model: time-driven ambient motion plus pointer-driven parallax and hover.
- The source uses a fixed full-viewport WebGL canvas beneath DOM text.
- The oversized heading and supporting blocks shift subtly with pointer position.
- The central `View projects` surface is the primary link and includes a moving visual reel plus an orb-like focal layer.
- A smaller lower-right reel cycles independently.
- The scene remains one viewport tall; the typography and project surfaces recompose for narrow viewports.
- The implementation recreates those behaviors with scoped React/CSS motion and Lauren's existing project imagery, avoiding source logos, copy, and branded media.

