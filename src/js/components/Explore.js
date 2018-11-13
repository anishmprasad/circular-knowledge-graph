/* eslint-disable */

import selectedNode from "../helpers/selectedNode";
import Vector from "../helpers/Vector";
import Node from "../helpers/Node";
import projects from "../data/data.json";

/**
 * Project explore component canvas renderer.
 */


export default function Explore(config_service) {
  var _this = this;
  var canvasEl = document.getElementById("canvasEL");
  this.AMBIENCE_RANDOM_ACTION_INTERVAL = 1000;
  this.AMBIENCE_WAIT_AFTER_USER_INPUT = 7000;
  this.LAME_NODE_COUNT = 25;
  this.canvas;
  this.done = false;
  this.context = canvasEl.getContext("2d");;
  this.timer = window.requestAnimationFrame;
  this.frameCount = 0;
  this.nodes = [];
  this.activeNode;
  this.hoveredNode;
  this.nextActionTime;
  this.formVisible;
  this.mousePos;
  this.globalMousePos;
  this.hovered = false;
  this.pauseInteraction = false;
  this.selected_project = {};
  this.selected_project_changed = false;
  this.hovered_project = {};
  this.projects_subscription;
  this.config_service = config_service;
  this.canvas_width = config_service.MOBILE_WIDTH;
  this.canvas_height = config_service.MOBILE_WIDTH;

  /*
   * Navigate to the list view.
   */
  this.navigateToListView = function () {
    this.projects_service.requestParams.page_size =
      this.config_service.LIST_PAGE_SIZE;
    this.router.navigate(['/list', 'featured']);
  }



  /**
   * Gets projects from `projects_service` and creates a new `Node` for
   * each.
   */
  this.loadProjects = function (p) {
    const projects = p.slice();
    const lame_node = { lame: true };
    const _that = this;
    _that.nodes = [];
    let lame_index = 0;

    while (lame_index < this.LAME_NODE_COUNT) {
      projects.push(lame_node);
      lame_index++;
    }

    projects.forEach((function (project, index) {
      if (index > 15 && !project.lame) {
        project.small = true;
      }
      _that.nodes.push(new Node(project));
    }));
  }

  /**
   * Global click handler. Determines coordinates of click, whether a node was
   * clicked, and routes the action accordingly.
   * @param evt  click event.
   */
  this.clickHandler = function (evt) {
    const box = this.canvas.getBoundingClientRect();
    const coords = {
      x: evt.pageX - box.left - window.pageXOffset,
      y: evt.pageY - box.top - window.pageYOffset
    };
    const clicked_node = this.getNodeUnder(
      coords.x - this.canvas_width / 2,
      coords.y - this.canvas_height / 2);
    if (clicked_node) {
      if (clicked_node.active) {
        clicked_node.onClick();
      } else {
        this.selectNone();
        clicked_node.onClick();
        this.selectProject(clicked_node);
      }
      // this.utils_service.trackEvent(
      //     'Projects_Explore', 'Click', 'Bubble ' + clicked_node.data.name);
    } else {
      this.selectNone();
    }
    this.userActionOccurred();
  }

  /**
   * Selects a given node (project).
   * @param node  the project object to be selected.
   */
  this.selectProject = function (node) {
    selectedNode(node)
    this.selected_project = node.data;
    setTimeout(() => {
      this.selected_project_changed = true;
    }, 200);
  }

  /**
   * Global mouse move handler. Determines coordinates of mouse and updates the
   * `globalMousePos` and `mousePos` objects.
   * @param evt  mouse move event.
   */
  this.moveHandler = function (evt) {
    this.hoveredNode = this.mousePos ?
      this.getNodeUnder(this.mousePos.x, this.mousePos.y) :
      null;

    const box = this.canvas.getBoundingClientRect();
    this.globalMousePos = {
      x: evt.pageX - box.left - window.pageXOffset,
      y: evt.pageY - box.top - window.pageYOffset
    };
    this.mousePos = new Vector(
      this.globalMousePos.x - this.canvas_width / 2,
      this.globalMousePos.y - this.canvas_height / 2, 0);
    evt.preventDefault();
    evt.stopPropagation();
  }

  /**
   * Figures out which node (project) was hovered.
   * @param evt  click event.
   */
  this.hoverHandler = function () {
    if (!this.mousePos) {
      return;
    }
    const new_hovered_node =
      this.getNodeUnder(this.mousePos.x, this.mousePos.y);
    this.clearHoverStyles();

    if (this.hoveredNode && new_hovered_node) {
      this.setHoverStyles(new_hovered_node);
    }

    if (!this.hovered && this.hoveredNode && this.hoveredNode.data.small) {
      this.hoveredNode.fadeCount = 0;
    }
  }

  /**
   * Sets styles when a node is hovered.
   * @param new_hovered_node  project node being hovered.
   */
  this.setHoverStyles = function (new_hovered_node) {
    this.canvas.style.cursor = 'pointer';
    this.hovered_project = new_hovered_node;

    if (new_hovered_node.data.name != this.hoveredNode.data.name &&
      this.hoveredNode.small) {
      new_hovered_node.data.focus = true;
      new_hovered_node.fadeCount = 0;
      this.hoveredNode.data.focus = false;
    } else {
      new_hovered_node.data.focus = false;
      this.hoveredNode.data.focus = true;
    }
    this.hovered = true;
  }

  /**
   * Removes styles when a node is NOT hovered.
   */
  this.clearHoverStyles = function () {
    this.canvas.style.cursor = 'default';
    this.nodes.forEach((node) => {
      node.data.focus = false;
    });
    this.hovered = false;
  }

  /**
   * update is the body of the animation loop. Controls canvas rendering.
   * Called once every timer tick.
   */
  this.update = function () {
    if (_this.done) {
      return;
    }

    _this.render(_this.context);
    _this.hoverHandler();

    if (_this.nodes.length) {
      _this.frameCount += 1;
    }

    if (_this.frameCount == 1) {
      _this.ambientActionOccurred();
    }

    _this.createLinks();

    _this.nodes
      .forEach((node) => {
        node.updateMousePos(_this.mousePos);
        node.update(_this.hoveredNode == node);
      })

    _this.updateAmbience();

    return _this.timer(_this.update);
  }

  /**
   * Draws lines from/to random project nodes.
   */
  this.createLinks = function () {
    for (var n of this.nodes) {
      if (n.link != null) {
        continue;
      }
      // # continue if Math.random() > 0.9
      n.linkTo(this.nodes[Math.floor(Math.random() * this.nodes.length)]);
    }
  }

  /**
   * The convas renderer. Everything is drawn into the canvas here.
   */
  this.render = function (ctx) {
    ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
    ctx.save();
    ctx.translate(this.canvas_width / 2, this.canvas_height / 2);

    // Lines on bottom
    // FF Can't deal with stroked shapes
    if ("chrome" !== 'Firefox') {
      this.nodes.forEach((node, index) => {
        node.renderLink(ctx);
      });
    }

    // Lame (gray non-interactive) nodes next
    this.nodes.forEach((node, index) => {
      if (node.data.lame && !node.active) {
        node.render(ctx);
      }
    });

    // Then small colored project nodes
    this.nodes.forEach((node, index) => {
      if (!node.data.lame && !node.active && node.data.small) {
        node.render(ctx);
      }
    });

    // Then large colored project nodes with logo
    this.nodes.forEach((node, index) => {
      if (!node.data.lame && !node.active && !node.data.small &&
        !node.data.focus) {
        node.render(ctx);
      }
    });

    // Hovered next
    this.nodes.forEach((node, index) => {
      if (!node.data.lame && !node.active && node.data.focus) {
        node.render(ctx);
      }
    });

    // Selected node on top
    this.nodes.forEach((node, index) => {
      if (!node.data.lame && node.active) {
        node.render(ctx);
      }
    });

    ctx.restore();
  }

  /**
   * Sets `nextActionTime` Date object.
   * @param offset  in milliseconds
   */
  this.setNextActionDelay = function (offset) {
    this.nextActionTime = new Date(new Date().getTime() + offset);
  }

  /**
   * Sets `nextActionTime` Date object and selects active node.
   */
  this.userActionOccurred = function () {
    this.setNextActionDelay(this.AMBIENCE_WAIT_AFTER_USER_INPUT);
    this.activeNode = this.getActiveNodes()[0];
  }

  /**
   * Selects active node.
   */
  this.ambientActionOccurred = function () {
    this.activeNode = this.getActiveNodes()[0];
  }

  /**
   * Gets `nextActionTime` Date object minus current time.
   */
  this.timeUntilNextAction = function () {
    return this.nextActionTime - new Date().getTime();
  }

  /**
   * Does random action when `timeUntilNextAction` gets to 0.
   */
  this.updateAmbience = function () {
    if (this.timeUntilNextAction() < 0) {
      this.doRandomAction();
      return this.ambientActionOccurred();
    }
  }

  /**
   * Filters nodes by `active` attribute.
   */
  this.getActiveNodes = function () {
    return this.nodes.filter(function (n) {
      return n.active;
    });
  }

  /**
   * Activates a random node.
   *
   * This method controls which nodes end up in the center, and for how
   * long (unless overridden by user input.)
   */
  this.doRandomAction = function () {
    let node;
    const filteredNodes = this.filterLames();
    if (this.pauseInteraction) {
      return;
    }

    if (this.getActiveNodes().length) {
      // make the current node leave the center and schedule the next
      // action.
      this.setNextActionDelay(this.AMBIENCE_RANDOM_ACTION_INTERVAL);
      return this.selectNone();
    } else {
      // pick a random node to display in the center
      node =
        filteredNodes[Math.floor(Math.random() * filteredNodes.length)];
      if (node != null) {
        this.setNextActionDelay(this.AMBIENCE_WAIT_AFTER_USER_INPUT);
        node.activate();
        this.selectProject(node);
      }
    }
  }

  /**
   * Filters out the grey (lame) nodes.
   */
  this.filterLames = function () {
    return this.nodes.filter(node => !node.data.lame);
  }

  /**
   * Deselects all nodes.
   */
  this.selectNone = function () {
    this.selected_project = {};
    this.selected_project_changed = false;

    for (var n of this.nodes) {
      n.deactivate();
    }
  }

  /**
   * Select the node under a specific x, y coordinate.
   * @param x  x coord.
   * @param y  y coord.
   */
  this.getNodeUnder = function (x, y) {
    let nodes = [];
    let chosen = null;

    for (var i = this.nodes.length - 1; i >= 0; i += -1) {
      var n = this.nodes[i];
      if (n.hitTest(x, y) && !n.data.lame) {
        nodes.push(n);
      }
    }
    nodes.forEach((node) => {
      if (!node.data.small) {
        chosen = node;
      }
    });
    return (nodes.length && !chosen) ? nodes[0] : chosen;
  }

  /**
   * Navigate to a project's details page.
   * @param evt  mouse event.
   */
  this.loadProjectDetails = function (evt) {
    this.projects_service.cachedColor = this.selected_project.fallbackColor ||
      this.selected_project.primaryColor;

    this.router.navigate(['/', this.selected_project.id]);

    // this.utils_service.trackEvent(
    //     'Projects_Explore', 'Click', 'View ' + this.selected_project.name);
    evt.preventDefault();
    evt.stopPropogation;
  }

  /**
   * Carousel algorithm to next/back through projects.
   * @param direction  iterator to go up or down `+1` or `-1`.
   * @param $event  mouse event.
   */
  this.clickedArrow = function (direction, $event) {
    let currentIndex = 0;
    let newIndex;
    let chosen;
    const filteredNodes = this.filterLames();

    filteredNodes.forEach((node, index) => {
      if (node.active) {
        currentIndex = index;
      }
    });

    newIndex = this.utils_service.modulo(
      currentIndex + direction, filteredNodes.length);
    this.selectNone();
    chosen = filteredNodes[newIndex];
    chosen.activate();
    this.selectProject(chosen);
    this.userActionOccurred();

    // this.utils_service.trackEvent(
    //     'Projects_Explore', 'Click', 'Cycle ' + direction);

    $event.stopPropagation();
  };
}

/**
 * If on a screen narrower than MOBILE_WIDTH, do not render and navigate to
 * list page.
 */
Explore.prototype.onInit = function () {
  if (window.innerWidth < this.config_service.MOBILE_WIDTH) {
    this.navigateToListView();
  } else {
    window.addEventListener('resize', () => {
      if (window.innerWidth < this.config_service.MOBILE_WIDTH &&
        this.router.url.indexOf('explore') > 0) {
        this.navigateToListView();
      }
    });
  }

  const dpi = window.devicePixelRatio || 1;
  this.canvas = document.getElementById("canvasEL");

  // Size the canvas based on device dpi
  this.canvas.width = this.canvas_width * dpi;
  this.canvas.height = this.canvas_height * dpi;

  // Set 2d rendering context
  this.context = this.canvas.getContext('2d');
  this.context.scale(dpi, dpi);

  this.done = false;

  // Reset language filters
  // this.languages_service.selectedLanguages = [];

  // Listen for projects to come back from API

  this.selectNone();
  this.loadProjects(projects);
  this.doRandomAction();
  this.canvas.dispatchEvent(new Event('mousemove'));

  this.canvas.addEventListener('mousemove', (event) => {
    this.moveHandler(event)
  })
  this.canvas.addEventListener('click', (event) => {
    this.clickHandler(event)
  })
  this.canvas.addEventListener('mouseover', (event) => {
    this.pauseInteraction = true;
  })
  this.canvas.addEventListener('mouseout', (event) => {
    this.pauseInteraction = false;
  })

  return this.timer(this.update);
}

Explore.prototype.onDestroy = function () {
  this.done = true;
}