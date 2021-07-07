class Link{
    constructor(bodyA,bodyB) {
        var lastlink = bodyA.body.bodies.lenght -2;
        this.link = Constraint.create({
        bodyA: bodyA.body.bodies[lastlink],
        pointA: { x:0, y: 0},
        pointB: bodyB.body,
        pointB: {x: 0, y: 0},
        lenght:10,
        stiffnes: 0.8
          });
          
        World.add(world, this.link);
    }
    dettach() {
      World.remove(world, this.link);
    }
}