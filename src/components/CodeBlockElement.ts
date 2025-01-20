import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import CodeBlock from './CodeBlock';

@customElement('astro-code-block')
export class CodeBlockElement extends LitElement {
  @property()
  code: string = '';

  @property()
  language: string = 'plaintext';

  render() {
    return html`
      <div>
        ${CodeBlock({ code: this.code, language: this.language })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'astro-code-block': CodeBlockElement;
  }
}