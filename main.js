const getSel = sel => document.querySelector(sel);

const swapNone = (remove, add) => {
    if (remove.classList.contains('none'))
        remove.classList.remove('none');

    add.classList.add('none');
}

const CONTENT = getSel('.content');

const MAIN_BLOCK = getSel('.main-block');
const ADD_BLOCK = getSel('.add-block');

const EDIT_BLOCK = getSel('.edit');
const STYLE_BLOCK = getSel('.style');

const EDIT_FIELD = getSel('.edit-field');

// Settings button
const EDIT_BUTTON = getSel('.settings__edit-button');
const STYLE_BUTTON = getSel('.settings__style-button');

EDIT_BUTTON.addEventListener(
    'click',
    () => {
        EDIT_FIELD.value = CONTENT.innerHTML;

        swapNone(EDIT_BLOCK, STYLE_BLOCK);
    }
);

STYLE_BUTTON.addEventListener(
    'click',
    () => swapNone(STYLE_BLOCK, EDIT_BLOCK)
);

// Saving changes
const SAVE_CHANGES_BUTTON = getSel('.save-changes-button');

SAVE_CHANGES_BUTTON.addEventListener(
    'click',
    () => {
        CONTENT.innerHTML = EDIT_FIELD.value;

        EDIT_BLOCK.classList.add('none');
    }
);

// Style block

// Font-Size
const FONT_SIZE = getSel('.style__settings-font-size');
FONT_SIZE.addEventListener(
    'click',
    e => {
        if (e.target.name == 'fontSize')
            CONTENT.style.fontSize = e.target.value;
    }
);

// Font-Family
const FONT_FAMILY = getSel('.style__settings-font-family');
FONT_FAMILY.addEventListener(
    'change',
    () => {
        CONTENT.style.fontFamily = FONT_FAMILY.value;
    }
);

// Change color
const GRID_OF_COLORS = getSel('.grid-of-colors');

// Text color
const TEXT_COLOR = getSel('.text-color-button');
TEXT_COLOR.addEventListener(
    'click',
    () => {
        if (GRID_OF_COLORS.classList.contains('none'))
            GRID_OF_COLORS.classList.remove('none');

        GRID_OF_COLORS.setAttribute('data-style', 'color');
    }
);

// Background color
const BACKGROUND_COLOR = getSel('.background-color-button');
BACKGROUND_COLOR.addEventListener(
    'click',
    () => {
        if (GRID_OF_COLORS.classList.contains('none'))
            GRID_OF_COLORS.classList.remove('none');

        GRID_OF_COLORS.setAttribute('data-style', 'backgroundColor');
    }
);

GRID_OF_COLORS.addEventListener(
    'click',
    e => {
        if (e.target.classList.contains('grid-of-colors__item'))
            CONTENT.style[GRID_OF_COLORS.dataset.style] = e.target.style.backgroundColor;

        GRID_OF_COLORS.classList.add('none');
    }
);

// Font-Style/Font-Weight
const FONT_STYLE = getSel('.font-style-block');
FONT_STYLE.addEventListener(
    'click',
    e => {
        if (e.target.type = 'checkbox')
            CONTENT.style[e.target.dataset.style] = e.target.checked ? e.target.value : '';
    }
);

// Add element
const addElement = element => {
    EDIT_FIELD.value += element.outerHTML;

    swapNone(MAIN_BLOCK, ADD_BLOCK);
}

const ADD_ELEMENT_BUTTON = getSel('.add-element-button');
ADD_ELEMENT_BUTTON.addEventListener(
    'click',
    () => swapNone(ADD_BLOCK, MAIN_BLOCK)
);

// List of elements
const clearAddPage = form => {
    const INPUTS = LIST_OF_ELEMENTS.querySelectorAll('input');

    for (const ITEM of INPUTS)
        getSel(`.create-element-${ITEM.value}`).classList.add('none');

    LIST_OF_ELEMENTS.reset();
    form.reset();
}

const LIST_OF_ELEMENTS = getSel('.create-element__list-of-elements');
LIST_OF_ELEMENTS.addEventListener(
    'click',
    () => {
        const INPUTS = LIST_OF_ELEMENTS.querySelectorAll('input');

        for (const ITEM of INPUTS) {
            if (ITEM.checked)
                getSel(`.create-element-${ITEM.value}`).classList.remove('none');
            else
                getSel(`.create-element-${ITEM.value}`).classList.add('none');
        }
    }
);

// Add element Table
const ADD_ELEMENT_TABLE_BUTTON = getSel('.create-element__button-element-table');
ADD_ELEMENT_TABLE_BUTTON.addEventListener(
    'click',
    () => {
        const CREATE_TABLE_FORM = getSel('.create-element-table');

        const COUNT_TR = getSel('#count-td').value;
        const COUNT_TD = getSel('#count-td').value;

        const WIDTH_OF_TD = getSel('#width-of-td').value;
        const HEIGHT_OF_TD = getSel('#height-of-td').value;

        const BORDER_WIDTH = getSel('#width-of-border').value;
        const BORDER_TYPE = getSel('#type-of-border').value;
        const BORDER_COLOR = getSel('#color-of-border').value;

        const BORDER = `${BORDER_WIDTH}px ${BORDER_TYPE} ${BORDER_COLOR}`;

        let table = document.createElement('table');
        table.style.border = BORDER;

        for (let i = 0; i < COUNT_TR; i++) {
            let tr = document.createElement('tr');

            for (let j = 0; j < COUNT_TD; j++) {
                let td = document.createElement('td');
                td.style.width = `${WIDTH_OF_TD}px`;
                td.style.height = `${HEIGHT_OF_TD}px`;
                td.style.border = BORDER;
                td.textContent = 'TD';

                tr.appendChild(td);
            }

            table.appendChild(tr);
        }

        addElement(table);
        clearAddPage(CREATE_TABLE_FORM);
    }
);

// Add element List
const ADD_ELEMENT_LIST_BUTTON = getSel('.create-element__button-element-list');
ADD_ELEMENT_LIST_BUTTON.addEventListener(
    'click',
    () => {
        const CREATE_LIST_FORM = getSel('.create-element-list');
        const COUNT_LI = getSel('#count-li').value;

        let list = document.createElement('ul');
        list.style.listStyleType = getSel('#type-of-list').value;

        for (let i = 0; i < COUNT_LI; i++) {
            let li = document.createElement('li');
            li.textContent = `Item ${i + 1}`;

            list.appendChild(li);
        }

        addElement(list);
        clearAddPage(CREATE_LIST_FORM);
    }
);