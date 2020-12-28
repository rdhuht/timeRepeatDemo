let 自动投喂时间长度s = 0
let 开始计时时刻 = 0
let 触发事件时刻 = 0
input.onButtonPressed(Button.A, function () {
    // 增加间隔时间
    自动投喂时间长度s += 1
})
input.onButtonPressed(Button.AB, function () {
    for (let index = 0; index < 3; index++) {
        basic.showIcon(IconNames.Heart)
        basic.showIcon(IconNames.SmallHeart)
    }
    basic.clearScreen()
    // 记录开始时刻
    开始计时时刻 = Math.idiv(input.runningTime(), 1000)
    // 记录第一次触发的时刻
    触发事件时刻 = 开始计时时刻 + 自动投喂时间长度s
})
input.onButtonPressed(Button.B, function () {
    // 减少间隔时间
    自动投喂时间长度s += -1
})
// 控制台显示各个变量
basic.forever(function () {
    serial.writeValue("时长", 自动投喂时间长度s)
    serial.writeValue("触发时刻", 触发事件时刻)
    serial.writeValue("运行时间", input.runningTime() / 1000)
})
basic.forever(function () {
    if (Math.idiv(input.runningTime(), 1000) == 触发事件时刻) {
        music.startMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once)
        // 自动记录开始时刻
        开始计时时刻 = Math.idiv(input.runningTime(), 1000)
        // 自动记录下一次触发时刻
        触发事件时刻 = 开始计时时刻 + 自动投喂时间长度s
    }
})
