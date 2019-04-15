/*jshint esversion: 6 */
// @ts-check

/**
 * CS559 3D World Framework Code
 *
 * Simple, automatic UI from an world with properly declared parameters 
 */

/** @module AutoUI */

// we need to have the BaseClass definition
import { GrObject } from "./GrObject.js";
// we need to import the module to get its typedefs for the type checker
import * as InputHelpers from "../Libs/inputHelpers.js";
import { GrWorld } from "./GrWorld.js";

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("../../Workbook08-Workspace/THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

export class WorldUI {
    /**
     * Create a UI panel for a GrObject
     * goes through the parameters and makes a slider for each
     * also defines a callback for those sliders that calls the
     * world's update function.
     * 
     * This does place the panel into the DOM (onto the web page)
     * using `insertElement` in the CS559 helper library. The place
     * it is placed is controlled the `where` parameter. By default,
     * it goes at the end of the DOM. However, you can pass it a DOM 
     * element to be placed inside (or some other choices as well).
     * 
     * @param {GrWorld} world 
     * @param {number} [width=300] 
     * @param {InputHelpers.WhereSpec} [where] - where to place the panel in the DOM (at the end of the page by default)
     */
    constructor(world,width=300,where=undefined) {
        let self=this;
        this.world = world;
        this.div = InputHelpers.makeBoxDiv({width:width},where);
        InputHelpers.makeHead("World Controls",this.div,{tight:true});
        let _world = this.world;
        // create object selector
        this.selectObject = InputHelpers.makeSelect(world.objects.map(ob => ob.name), this.div);
        this.selectObject.onchange = function() {
            _world.setActiveObject(this.value);
        }

        this.selectObject.onchange(null); // call to set initial selection
        // create "view solo" checkbox.
        this.selectionChkList = InputHelpers.makeFlexDiv(this.div);
        /**@type HTMLInputElement */
        this.chkSolo = InputHelpers.makeCheckbox("chkSolo", this.selectionChkList, "View Solo Object");
        this.chkSolo.onclick = function() {
            if (this.checked) { _world.showSoloObject(); }
            else              { _world.showWorld(); }
        }
        this.selectViewMode = InputHelpers.makeSelect(["Default", "Follow Object", "Drive Object"], this.div);
        this.selectViewMode.onchange = function() {
            _world.setViewMode(this.value);
        }
        this.selectViewMode.onchange(null);
        this.update(); 
    }
    update() {
        // let vals = this.sliders.map(sl => Number(sl.value()));
        // this.world.update(vals);
    }

    /**
     * 
     * @param {number | string} param 
     * @param {number} value 
     */
    set(param,value) {
        // if (typeof(param)==='string') {
        //     for(let i=0; i<this.world.params.length; i++) {
        //         if (param==this.world.params[i].name) {
        //             // this.sliders[i].set(Number(value));
        //             return;
        //         }
        //     }
        //     throw `Bad parameter ${param} to set`;
        // } else {
            // this.sliders[param].set(Number(value));
        // }
    }

}
