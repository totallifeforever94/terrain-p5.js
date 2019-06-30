import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private width = Math.floor(window.innerWidth - 100);
  private height = Math.floor(window.innerHeight - 200);
  private scale = 25;
  private cols = Math.floor((this.width + 100) / this.scale);
  private rows = Math.floor((this.height + 200) / this.scale);
  private terrain = new Array(this.cols);
  private flyingSpeed = 0;

  ngOnInit() {
    this.createTwoDementionalArray();
    this.initCanvas();
  }

  private initCanvas() {
    const sketch = (s: any) => {
      s.setup = () => {
        s.createCanvas(this.width, this.height, s.WEBGL);
      };

      s.draw = () => {
        this.flyingSpeed -= 0.035;
        this.generateNoise(s);

        s.background(0);
        s.stroke('#0B5B80');
        s.noFill();

        s.translate(this.width / 2, this.height / 8);
        s.rotateX(120);
        s.translate(-this.width, -this.height);

        this.createPoligonGrid(s);
      };
    };

    const canvas = new p5(sketch);
  }

  private createPoligonGrid(sketch: p5) {
    for (let y = 0; y < this.rows; y++) {
      sketch.beginShape(sketch.TRIANGLE_STRIP);
      for (let x = 0; x < this.cols; x++) {
        sketch.vertex(x * this.scale, y * this.scale, this.terrain[x][y]);
        sketch.vertex(x * this.scale, (y + 1) * this.scale, this.terrain[x][y + 1]);
      }
      sketch.endShape();
    }
  }

  private generateNoise(sketch: p5) {
    let yoff = this.flyingSpeed;
    for (let y = 0; y < this.rows; y++) {
      yoff += 0.1;
      let xoff = 0;
      for (let x = 0; x < this.cols; x++) {
        this.terrain[x][y] = sketch.map(sketch.noise(xoff, yoff), 0, 1, -130, 130);
        xoff += 0.1;
      }
    }
  }

  private createTwoDementionalArray() {
    for (let i = 0; i < this.terrain.length; i++) {
      this.terrain[i] = new Array(this.rows);
    }
  }
}
