import { RaphaelPaper, RaphaelSet, RaphaelElement, RaphaelAxisAlignedBoundingBox } from 'raphael';
import { setNodeAccessoryPosition } from './shape-helper';

interface FirstNodeShapeOptions {
  paper: RaphaelPaper;
  x: number;
  y: number;
  label: string;
}

// 第一代子节点的shape
// todo 可是叫first和root又有点冲突
// todo 抽象node
class FirstNodeShape {
  private readonly paper: RaphaelPaper;
  private readonly shapeSet: RaphaelSet;
  private labelShape: RaphaelElement;
  private rectShape: RaphaelElement;

  public constructor({
    paper,
    x,
    y,
    label,
  }: FirstNodeShapeOptions) {
    this.paper = paper;
    this.shapeSet = this.paper.set();
    this.labelShape = this.paper.text(x, y, label);
    this.rectShape = this.paper.rect(x, y, 0, 0, 4);
    this.draw({ x, y, label });
  }

  public getBBox(): RaphaelAxisAlignedBoundingBox {
    return this.rectShape.getBBox();
  }

  public translate(offsetX: number, offsetY: number): void {
    const labelX = this.labelShape?.attr('x') || 0;
    const labelY = this.labelShape?.attr('y') || 0;
    this.labelShape?.attr({
      x: labelX + offsetX,
      y: labelY + offsetY,
    });

    const rectX = this.rectShape?.attr('x') || 0;
    const rectY = this.rectShape?.attr('y') || 0;
    this.rectShape?.attr({
      x: rectX + offsetX,
      y: rectY + offsetY,
    });
  }

  public select(): void {
    this.rectShape?.attr({
      'stroke': '#ff0033',
      'stroke-width': 2.5
    });
  }

  public unSelect(): void {
    this.rectShape?.attr({
      'stroke': '#808080',
      'stroke-width': 1,
    });
  }

  private draw({ x, y, label }: {
    x: number;
    y: number;
    label: string;
  }): void {
    this.labelShape.toFront();
    this.labelShape.attr({
      'font-size': 16,
      'text': label,
    });

    this.rectShape.attr({
      'fill': 'white',
      'stroke': '#808080',
      'stroke-width': 1,
    });

    setNodeAccessoryPosition({
      label: this.labelShape,
      rect: this.rectShape,
      nodeX: x,
      nodeY: y,
      paddingWidth: 40,
      paddingHeight: 20,
    });

    this.shapeSet.push(this.labelShape).push(this.rectShape);
  }
}

export default FirstNodeShape;