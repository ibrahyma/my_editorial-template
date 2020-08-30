const SCREEN_XL_MINIMUM_VAL = 1200;
const SCREEN_L_MINIMUM_VAL = 992;
const SCREEN_M_MINIMUM_VAL = 768;
const SCREEN_S_MINIMUM_VAL = 578;

var index = document.getElementById("index");
var menu_burger = document.getElementById("menu_burger");
var page = document.getElementById("page");
var sidebar = document.getElementById("sidebar");
var sublists = document.getElementsByClassName("sublist");

var sidebar_style = getComputedStyle(sidebar, null);
var sidebar_height = Number.parseFloat(sidebar_style.getPropertyValue("height").replace("px", ""));
var sidebar_marginRight = Number.parseFloat(sidebar_style.getPropertyValue("margin-right").replace("px", ""));
var sidebar_width = Number.parseFloat(sidebar_style.getPropertyValue("width").replace("px", ""));

function getElementsArray(html_collection_of_element)
{
    if (html_collection_of_element instanceof HTMLCollection)
    {
        var array = [];
        for (var i = 0; i < html_collection_of_element.length; i++)
        {
            array[i] = html_collection_of_element.item(i);
        }
        return array;
    }
    else
    {
        throw new TypeError("Ce n'est pas une collection d'éléments.");
    }
}

function elementIsVisible(element)
{
    if (element instanceof Element)
        return getComputedStyle(element, null).getPropertyValue("display") != "none";
    else
        throw new TypeError("Ce n'est pas un élément.");
}

function setElementDisplay(element)
{
    if (element instanceof Element)
        element.style.display = elementIsVisible(element) ? "none" : "initial";
    else
        throw new TypeError("Ce n'est pas un élément.");
}

menu_burger.addEventListener("click", function()
{
    setElementDisplay(sidebar);
    if (innerWidth < SCREEN_XL_MINIMUM_VAL)
    {
        this.style.left = (elementIsVisible(sidebar) ? (sidebar_marginRight + sidebar_width) : "0") + "px";
        index.style.scrollY = scrollY + "px";
    }
});

var sublists_array = getElementsArray(sublists);
sublists_array.forEach(function (sublist)
{
    var i = 0;

    while (!Object.is(sublist, sublists_array[i]))
    {
        i++;
    }

    sublist.querySelector("span").addEventListener("click", function(e)
    {
        var sublist_ul = sublist.querySelector("ul");
        setElementDisplay(sublist_ul);
        this.style.marginBottom = elementIsVisible(sublist_ul) ? "10px" : "0";
        this.querySelector("i").style.transform = elementIsVisible(sublist_ul) ? "rotate(180deg)" : "unset";
    });
});

/* Ecrans de taille XL minimum */

document.addEventListener("scroll", function (e)
{
    if (innerWidth >= SCREEN_XL_MINIMUM_VAL)
    {
        if (elementIsVisible(sidebar))
        {
            if (scrollY >= sidebar_height - innerHeight)
            {
                sidebar.style.position = "fixed";
                sidebar.style.bottom = "0";
                page.style.marginLeft = (sidebar_marginRight + sidebar_width) + "px";
            }
            else
            {
                sidebar.style.position = "relative";
                page.style.marginLeft = "0px";
            }
        }
    }
});

/* Ecrans de taille L maximum */

if (innerWidth < SCREEN_XL_MINIMUM_VAL)
{
    document.body.style.overflow = "hidden";
    page.style.height = innerHeight + "px";
    sidebar.style.height = innerHeight + "px";

    page.style.overflow = "auto";
    sidebar.style.overflow = "auto";
    
    index.addEventListener("click", function()
    {
        sidebar.style.display = "none";
        menu_burger.style.left = "0px";
    });
}