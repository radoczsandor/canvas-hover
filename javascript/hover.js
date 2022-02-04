import { items } from './items.js';

const canvas = document.getElementById("canvas");
canvas.width = 1000;
canvas.height = 200;
const ctx = canvas.getContext("2d");

const itemContainer = document.getElementById('item-cointaner');
const ItemCombobox = document.getElementById("item-combobox");

let hover = false;
let id;
let _i;
let _b;

function draw(){
    items.forEach(item =>{
        ctx.fillStyle = '#242F40';
        ctx.fillRect(item.x,item.y,item.w,item.h);
    })
}

// fill the combobox
function fillCombobox() {
    for (var i = 0; i < items.length; i++) {
        var opt = items[i].Name;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        ItemCombobox.appendChild(el);
    }
}
// gets the value of the combobox and color the Items
function drawComboboxItems() {
    ItemCombobox.addEventListener('change', function (e) {
        let itemComboboxValue = ItemCombobox.options[ItemCombobox.selectedIndex].text;
        for (let i = 0; i < items.length; i++) {
            if (itemComboboxValue === items[i].Name) {
                ctx.fillStyle = "#cca43b";
                ctx.fillRect(items[i].x, items[i].y, items[i].w, items[i].h);
                break;
            } else {
                draw();
            }
        }
    });
}

// coloring and displaying the items 
function drawItem() {
    for (_i = 0; _b = items[_i]; _i++) {
        if (hover && id === _i) {
            ctx.fillStyle = "#cca43b"; // GOLD
            ctx.fillRect(items[_i].x, items[_i].y, items[_i].w, items[_i].h);
            itemContainer.textContent = `Item: ${items[_i].Name}`;
            break;
        } else {
            draw();
        }
    }
}
// Eventlistener for mouseover on canvas, when ok = drawItems
function cursorHitsItem() {
    canvas.addEventListener('mousemove', function (e) {
        let rects = canvas.getBoundingClientRect();
        let transform = ctx.getTransform();

        let mouseX = (e.clientX - rects.left - transform.e) / transform.a;
        let mouseY = (e.clientY - rects.top - transform.f) / transform.d;

        hover = false;

        for (let i = items.length - 1, b; b = items[i]; i--) {
            if (mouseX >= b.x && mouseX <= b.x + b.w &&
                mouseY >= b.y && mouseY <= b.y + b.h) {
                // when the cursor hits the Item
                hover = true;
                id = i;
                break;
            }
        }
        drawItem();
    });
}
draw();
fillCombobox();
cursorHitsItem();
drawComboboxItems();
