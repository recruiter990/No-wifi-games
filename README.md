# No Wi-Fi Games

A Manifest V3 browser extension with eight bundled games. No network requests, accounts, remote scripts or extension permissions are required.

## Install locally

1. Download or clone this repository and run `python package_extension.py`.
2. Open `chrome://extensions` (or `edge://extensions`).
3. Enable **Developer mode**, choose **Load unpacked**, and select `release/no-wifi-games`.
4. Click the extension icon. Select a game to open it in a full tab.

## Games

| Game | Modes | Controls |
| --- | --- | --- |
| Connect Four | Computer or local two-player | Click a column |
| Minesweeper | Solo, 9×9, 10 mines | Click to reveal; right-click or Flag mode to flag |
| Breakout | Solo | Arrow keys / A and D / pointer; Launch to serve |
| Memory Match | Solo or local two-player | Click pairs of cards |
| Sokoban | Solo, five rooms | Arrow keys / WASD / on-screen arrows; Undo |
| Reversi | Computer or local two-player | Click a marked legal square |
| Mini Golf | Solo, three holes | Drag backward from the ball, release to shoot |
| Light Trails | Local two-player | Player 1 WASD; Player 2 arrows |

Scores for Breakout, Memory Match, Minesweeper and Mini Golf are stored locally. Computer opponents use simple heuristics. Light Trails requires a shared keyboard. Breakout and Light Trails pause when focus is lost or the tab is hidden.

All game code is in `games/play.js`; the popup catalog is in `launcher.js`. Legacy games were removed; their originals remain recoverable from Git history.

The packaging script also produces `release/no-wifi-games.zip`. Extract it to a folder before choosing Load unpacked. The clean package excludes unused legacy assets and Chrome Web Store metadata still present in the repository.

## Verification

With Node.js, Playwright and Google Chrome installed:

```sh
npm install --no-save playwright
node tests/smoke.cjs
```

The browser smoke test blocks HTTP/HTTPS requests, checks all eight game pages, filters, computer turns, wins, restarts and undo. It saves local screenshots in `tests/` (ignored by Git).
