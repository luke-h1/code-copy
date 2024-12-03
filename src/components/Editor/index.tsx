"use client";

import clsx from "clsx";
import domToImage from "dom-to-image";
import hljs from "highlight.js";
import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { toast } from "sonner";
import styles from './Editor.module.scss';

function adjustTextAreaHeight(target: HTMLTextAreaElement) {
  // eslint-disable-next-line no-param-reassign
  target.style.height = 'auto'

  // eslint-disable-next-line no-param-reassign
  target.style.height = `${target.scrollHeight}px`;
}

function handleTabKey(event: KeyboardEvent<HTMLTextAreaElement>) {
  if (event.key === 'Tab') {
    event.preventDefault();

    const textArea = event.target as HTMLTextAreaElement;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    textArea.value = `${textArea.value.substring(0, start)  } ${  textArea.value.substring(end)}`;
    // eslint-disable-next-line no-multi-assign
    textArea.selectionStart = textArea.selectionEnd = start + 2;
  }
}

export default function Editor() {
  const [exportType, setExportType] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');
  const [theme, setTheme] = useState<string>('purple');

  const initialCode = `
    function Snippet() {
      const snippet = 'https://snippet.fyi';
      return (
        <li>Snippet URL: {snippet}</li>
      );
    }    
  `

  const [code, setCode] = useState<string>(initialCode);
  const [textAreaHeight, setTextAreaHeight] = useState<string>('22.5px');
  const [cardPadding, setCardPadding] = useState<string>('64px');

  const highlightedCode = hljs.highlight(language, code).value;

  useEffect(() => {
    const textAreaElement = document.querySelector(`.${styles.textarea}`);

    if (textAreaElement) {
      adjustTextAreaHeight(textAreaElement as HTMLTextAreaElement);
    }
  }, [code])

  function handleTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const {target} = event;
    setCode(target.value);
    adjustTextAreaHeight(target);
  }

  const exportCard = (format: 'png' | 'svg' | 'url') => {
    const cardElement = document.querySelector(`.${styles.card}`);

    if (!cardElement) {
      // eslint-disable-next-line no-useless-return
      return;
    }
  }

}