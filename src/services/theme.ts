import { argbFromHex, themeFromSourceColor, applyTheme } from "@material/material-color-utilities"

// #f82506
export function initTheme() {
    // Get the theme from a hex color
    const theme = themeFromSourceColor(argbFromHex("#1c93d3"), [
        {
            name: "custom-1",
            value: argbFromHex("#0000FF"),
            blend: true,
        },
    ]);

    // Print out the theme as JSON
    console.log(JSON.stringify(theme, null, 2));

    // Check if the user has dark mode turned on
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Apply the theme to the body by updating custom properties for material tokens
    applyTheme(theme, { target: document.body, dark: true });
}