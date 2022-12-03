function wall(x, y, width, height) {
    return Matter.Bodies.rectangle(x, y, width, height, {
        isStatic: true,
        render: {
            fillStyle: '#868e96'
        }
    });
}


function bead() {
    return Matter.Bodies.circle(280, 40, 11, {
        render: {
            fillStyle: '#e64980'
        }
    });
}

function block() {
    return Matter.Bodies.rectangle(Math.random() *400+100, 50, 105,30, {
//               id : 'phoneBody',
              density: 30.04,
              friction: 0.15,
              frictionAir: 0.15,
              restitution: 0.2,
              render: { 
//                 fillStyle: '#ffffff',
//                 strokeStyle: 'black',
//                 lineWidth: 1,
                text: {
                content: "FN",
                color: "#000000",
                size: 15
              }},
              url: "https://stackoverflow.com/questions/44996124/matter-js-option-to-add-html-to-body"
            });
// Create a Mouse-Interactive object & add it to the World
render.mouse = Matter.Mouse.create(render.canvas);
var mouseInteractivity = Matter.MouseConstraint.create(engine, {
                          mouse: render.mouse,
                          constraint: {
                            stiffness: 0.2,
                            render: { visible: false }
                          }
                         });
Matter.World.add(engine.world, mouseInteractivity);

// Create a On-Mouseup Event-Handler
Events.on(mouseInteractivity, 'mouseup', function(event) {
  var mouseConstraint = event.source;
  var bodies = engine.world.bodies;
  if (!mouseConstraint.bodyB) {
    for (i = 0; i < bodies.length; i++) { 
      var body = bodies[i];
      if (Matter.Bounds.contains(body.bounds, mouseConstraint.mouse.position)) {
        var bodyUrl = body.url;
        console.log("Body.Url >> " + bodyUrl);
        // Hyperlinking feature
        if (bodyUrl != undefined) {
          window.open(bodyUrl, '_blank');
          console.log("Hyperlink was opened");
        }
        break;
      }
    }
  }
});
//     Matter.Bodies.rectangle(40, 40, 20, 20, {
//   render: {
// //     fillStyle: "transparent",
// //     strokeStyle: "transparent",
//     text: {
//       content: "FN",
//       color: "black",
//       size: 15
//     }
//   }
// })
//     return Matter.Bodies.rectangle(40, 40, 50, 50, {
//             density: 1, // 密度
//             frictionAir: 0.06, // 空気抵抗
//             restitution: 1, // 弾力性
//             friction: 0.01, // 本体の摩擦
//             render: {
//                 fillStyle: "transparent",
//                 strokeStyle: "transparent",
//                 text: {
//                   content: "FN",
//                   color: "black",
//                   size: 15
//                     }
//                     }
//     });
}
function dropBead() {
    Matter.World.add(engine.world, bead());
}
function dropBlock() {
    Matter.World.add(engine.world, block());
}
// engine
let engine = Matter.Engine.create();

// render
let render = Matter.Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 560,
        height: 560,
        wireframes: false,
        background: '#dddddd'
    }
});
Matter.Render.run(render);

// runner
let runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);

// boundary walls ; wall(x, y, width, height)
Matter.World.add(engine.world, [
    wall(280, 0, 560, 5),   // top
    wall(280, 560, 560, 5), // bottom
    wall(0, 280, 5, 560),   // left
    wall(560, 280, 5, 560), // right
]);


// beads
let dropBeadInterval = setInterval(dropBlock, 1000);
