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


function block(box,url) {
    return Matter.Bodies.rectangle(Math.random() *344+108, 50, 216,60, {
//               id : 'phoneBody',
              density: 30.04,
//               angle:Math.random()*1.57,
              friction: 0.15,
              frictionAir: 0.15,
              restitution: 0.2,
              render: { 
//                 fillStyle: '#ffffff',
//                 strokeStyle: 'black',
//                 lineWidth: 1,
//                 text: {
//                 content: "AAA",
//                 color: "#000000",
//                 size: 20,
//                 family:"Papyrus",}
            sprite: { //スプライトの設定
					texture: box,//スプライトに使うテクスチャ画像を指定
					xScale: 0.185, yScale: 0.185, 
				}
              },
              url: url,
            });

}
function dropBead() {
    Matter.World.add(engine.world, bead());
}
function dropBlock(box,url) {
    Matter.World.add(engine.world, block(box,url));
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
const Events     = Matter.Events;
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
let touchStart = null;
    mouseControl.mouse.element.addEventListener('touchstart', (event) => {
      if (!mouseControl.body) {
        touchStart = event;
      }
    });

    let space: any = null
    
    mouseControl.mouse.element.addEventListener('touchend', (event) => {
        event.preventDefault();
        touchStart = null;
    });


    mouseControl.mouse.element.addEventListener('touchmove', (event) => {
      if (!mouseControl.body && touchStart) {
          event.preventDefault();
          let start = touchStart.touches[0].clientY
          let end = event.touches[0].clientY
          let delta = start - end
          window.scrollTo(0, window.scrollY + delta);
          touchStart = event
      }
    });
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
// let dropBeadInterval = setInterval(dropBlock, 1000);

function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}
var boxes = ['profile.png', 'instagram.png', 'gallery.png', 'twitter.png','youtube.png'];
var urls=['',
'https://www.instagram.com/shojug/',
'',
'https://twitter.com/jugjug1542',
'https://www.youtube.com/@harryshota619'];

for (let step = 0; step < 5; step++){
  console.log(boxes[step]);
  dropBlock(boxes[step],urls[step]);
//   sleep(800);
// setTimeout(function(){doSomethingLoop(maxCount, ++i)}, 1000);
  
}
    
  
//   const intervalId = setInterval(() =>{
//     countUp();
//     if(count > 5){　
//       clearInterval(intervalId);　//intervalIdをclearIntervalで指定している
//     }}, 800);
