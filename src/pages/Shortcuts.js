import React from 'react';
import { Document, Page } from 'react-pdf';
import shortcuts from '../files/shortcuts.pdf';

const Shortcuts = () => {
    return (
    <div style={{"marginTop": "30px"}}>
        <b>Calcs shortcuts:</b>
        <ol>
            <li>Add a new input cell: alt + a</li>
            <li>Remove the end input cell: alt + x</li>
            <li>Save active calc to ‘My Calcs’: ctrl + s</li>
            <li>Clear all: alt + c</li>
            <li>Select up:  shift + up arrow</li>
            <li>Select down: shift + down arrow</li>
            <li>Run all active cells only: shift + e</li>
            <li>Run all calc cells: ctrl + enter</li>
        </ol>

        <b>Note:</b>
        <ul>
            <li> all keyboard shortcuts apply to windows operating systems only</li>
            <li>The contextual app keyboard shortcut overrides the browser shortcut where these overlap</li>
        </ul>
    </div>
    );
}

export default Shortcuts;