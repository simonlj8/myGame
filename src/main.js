const { default: kaplay } = require("kaplay");


const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 380;

kaplay();

loadSprite("bean", "sprites/bean.png");

scene("game", () => {

    setGravity(1600);

    const player = add([
        sprite("bean"),
        pos(80, 40),
        area(),
        body(),
    ]);

    add([
        rect(width(), FLOOR_HEIGHT),
        outline(4),
        pos(0, height()),
        anchor("botleft"),
        area(),
        body({ isStatic: true }),
        color(127, 200, 255),
    ]);

    function jump() {
        if (player.isGrounded()) {
            player.jump(JUMP_FORCE);
        }
    }

    onKeyPress("space", jump);
    onClick(jump);

    function spawnTree() {
        add([
            rect(48, rand(32, 96)),
            area(),
            outline(4),
            pos(width(), height() - FLOOR_HEIGHT),
            anchor("botleft"),
            color(255, 180, 255),
            move(LEFT, SPEED),
            "tree",
        ]);

        wait(rand(0.5, 1.5), spawnTree);
    }

    // start spawning trees
    spawnTree();

    player.onCollide("tree", () => {
        go("lose", score);
       // burp();
        addKaboom(player.pos);
    });

    let score = 0;

    const scoreLabel = add([text(score), pos(24, 24)]);
    onUpdate(() => {
        score++;
        scoreLabel.text = score;
    });
});

scene("lose", (score) => {
    add([
        sprite("bean"),
        pos(width() / 2, height() / 2 - 80),
        scale(2),
        anchor("center"),
    ]);


    add([
        text(score),
        pos(width() / 2, height() / 2 + 80),
        scale(2),
        anchor("center"),
    ]);

    onKeyPress("space", () => go("game"));
    onClick(() => go("game"));
});

go("game");

// import startGame from "kaplay"



// const k = startGame()

// k.loadSprite("bean", "sprites/bean.png")

// k.add([
// 	k.pos(120, 500),
// 	k.sprite("bean"),
// ])

// k.onClick(() => k.addKaboom(k.mousePos()))