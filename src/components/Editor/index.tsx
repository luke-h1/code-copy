'use client';

import { themes } from '@frontend/config/themes';
import clsx from 'clsx';
import domToImage from 'dom-to-image';
import hljs from 'highlight.js';
import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import { toast } from 'sonner';
import EditorControls from '../EditorControls';
import styles from './Editor.module.scss';

function adjustTextAreaHeight(target: HTMLTextAreaElement) {
  // eslint-disable-next-line no-param-reassign
  target.style.height = 'auto';

  // eslint-disable-next-line no-param-reassign
  target.style.height = `${target.scrollHeight}px`;
}

function handleTabKey(event: KeyboardEvent<HTMLTextAreaElement>) {
  if (event.key === 'Tab') {
    event.preventDefault();

    const textArea = event.target as HTMLTextAreaElement;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    textArea.value = `${textArea.value.substring(0, start)} ${textArea.value.substring(end)}`;
    // eslint-disable-next-line no-multi-assign
    textArea.selectionStart = textArea.selectionEnd = start + 2;
  }
}

export default function Editor() {
  const [language, setLanguage] = useState<string>('javascript');
  const [theme, setTheme] = useState<string>('purple');

  const initialCode = `
    function Snippet() {
      const snippet = 'https://snippet.fyi';
      return (
        <li>Snippet URL: {snippet}</li>
      );
    }    
  `;

  const [code, setCode] = useState<string>(initialCode);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [textAreaHeight, _setTextAreaHeight] = useState<string>('22.5px');
  const [cardPadding, setCardPadding] = useState<string>('64px');

  const highlightedCode = hljs.highlight(language, code).value;



  useEffect(() => {
    const textAreaElement = document.querySelector(`.${styles.textarea}`);

    if (textAreaElement) {
      adjustTextAreaHeight(textAreaElement as HTMLTextAreaElement);
    }
  }, [code]);

  function handleTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { target } = event;
    setCode(target.value);
    adjustTextAreaHeight(target);
  }

  const exportCard = (format: 'png' | 'svg' | 'url') => {
    const cardElement = document.querySelector(`.${styles.card}`);

    if (!cardElement) {
      // eslint-disable-next-line no-useless-return
      return;
    }

    const scale = 2;

    const config = {
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${cardElement.offsetWidth}px`,
        height: `${cardElement.offsetHeight}px`,
      },
      width: cardElement.offsetWidth * scale,
      height: cardElement.offsetHeight * scale,
    };

    switch (format) {
      case 'png':
        domToImage.toPng(cardElement, config).then(dataUrl => {
          const link = document.createElement('a');
          link.download = 'snippet.png';
          link.href = dataUrl;
          link.click();
          toast.success('Generated PNG', {
            className: 'toast',
            unstyled: true,
            cancel: {
              label: 'Close',
              onClick: () => {},
            },
          });
        });
        break;

      case 'svg':
        domToImage.toSvg(cardElement, config).then(dataUrl => {
          const link = document.createElement('a');
          link.download = 'snippet.svg';
          link.href = dataUrl;
          link.click();
          toast.success('Generated SVG', {
            className: 'toast',
            unstyled: true,
            cancel: {
              label: 'Close',
              onClick: () => {},
            },
          });
        });
        break;

      case 'url':
        domToImage.toSvg(cardElement, config).then(dataUrl => {
          toast.success('Open console to see data URL', {
            className: 'toast',
            unstyled: true,
            cancel: {
              label: 'Close',
              onClick: () => {},
            },
          });
          // eslint-disable-next-line no-console
          console.log('dataUrl ->', dataUrl);
        });
        break;

      default:
        break;
    }
  };

  const themeClassName = clsx(styles.card, styles[theme]);

  // @ts-expect-error string mismatch
  // eslint-disable-next-line no-shadow
  const selectedThemeStyles = themes.find(theme => theme.value === theme || {});

  const themeStyles = {
    ...selectedThemeStyles,
    padding: cardPadding,
  };

  return (
    <>
      <EditorControls
        setTheme={setTheme}
        setLanguage={setLanguage}
        setCardPadding={setCardPadding}
        exportCard={exportCard}
        cardPadding={cardPadding}
      />
      <div className={styles.cardWrapper}>
        <div className={styles.editor}>
          <div className={themeClassName} style={themeStyles}>
            <div className={styles.ide}>
              <div className={styles.textareaWrapper}>
                <textarea
                  rows={1}
                  value={code}
                  className={styles.textarea}
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  style={{ height: textAreaHeight }}
                  onChange={handleTextareaChange}
                  onKeyDown={handleTabKey}
                  tabIndex={-1}
                />
                <div id='highlighted-code-div' 
                  className={styles.highlighted}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{__html: highlightedCode}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
