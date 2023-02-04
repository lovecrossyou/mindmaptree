import ToolOperation from '../../tool-operation';
import Selection from '../../selection/selection';
import { MElement } from '../m-element';
import { createToolbarItem } from './create-toolbar-item';

class AddChild {
  public readonly el: MElement;
  public readonly btnEl: MElement;
  private readonly toolOperation: ToolOperation;
  private readonly selection: Selection;
  constructor({
    toolOperation,
    selection,
  }: {
    toolOperation: ToolOperation;
    selection: Selection;
  }) {
    this.toolOperation = toolOperation;
    this.selection = selection;
    const elements = this.element();
    this.el = elements.el;
    this.btnEl = elements.btnEl;
  }

  public setState(): void {
    const selectNodes = this.selection.getSelectNodes();
    if (selectNodes.length === 1) {
      this.btnEl.removeClass('disabled');
    } else {
      this.btnEl.addClass('disabled');
    }
  }

  private element(): {
    el: MElement;
    btnEl: MElement;
  } {
    const {
      el,
      btnEl,
    } = createToolbarItem({
      iconName: 'add-child',
      tipLabel: '添加子主题',
    });

    btnEl.addEventListener('click', () => {
      this.toolOperation.addChildNode();
    }, false);

    return {
      el,
      btnEl,
    };
  }
}

export default AddChild;