import startGame from "kaplay"

const k = startGame()

k.loadSprite("bean", "sprites/bean.png")

k.add([
	k.pos(120, 500),
	k.sprite("bean"),
])

k.onClick(() => k.addKaboom(k.mousePos()))