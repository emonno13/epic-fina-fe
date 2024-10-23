import { REFERENCE_RULES } from '@constants/reference_rules';
import { useChatContext } from '@contexts/chat-provider';
import { ReferenceRule } from '@interfaces/conversation.interface';
import cn, { validateIframe } from '@utils';
import { langSubset } from '@utils/languages';
import React, { memo, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import supersub from 'remark-supersub';
import type { PluggableList } from 'unified';
import { CaretLine } from './CaretLine';

type TCodeProps = {
  inline: boolean;
  className?: string;
  children: React.ReactNode;
};

type TContentProps = {
  content: string;
  message: TMessage;
  showCursor?: boolean;
};

export const code = memo(function code({ inline, className, children }: TCodeProps) {
  const match = /language-(\w+)/.exec(className || '');
  const lang = match && match[1];
  return <code className={`${className}`}>{children}</code>;
});

function ATag({ href, children }: { href: string; children: React.ReactNode }) {
  // const user = useRecoilValue(recoilStore.user);
  // const { showToast } = useToastContext();

  const { file_id, filename, filepath } = useMemo(() => {
    const pattern = new RegExp(`(?:files|outputs)/123}/([^\\s]+)`);
    const match = href.match(pattern);
    if (match && match[0]) {
      const path = match[0];
      const parts = path.split('/');
      const name = parts.pop();
      const file_id = parts.pop();
      return { file_id, filename: name, filepath: path };
    }
    return { file_id: '', filename: '', filepath: '' };
  }, [href]);

  // const { refetch: downloadFile } = useFileDownload('', file_id);
  const props: { target?: string; onClick?: React.MouseEventHandler } = { target: '_new' };

  if (!file_id || !filename) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  const handleDownload = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  props.onClick = handleDownload;
  props.target = '_blank';

  return (
    <a href={filepath.startsWith('files/') ? `/api/${filepath}` : `/api/files/${filepath}`} {...props}>
      {children}
    </a>
  );
}

export const a = memo(ATag);

export const p = memo(function p({ children }: { children: React.ReactNode }) {
  return <p className='mb-2 whitespace-pre-wrap text-[16px] leading-[21px] font-normal text-left'>{children}</p>;
});

// const cursor = ' ';
const cursor = ' ';
const Markdown = memo(function Markdown({ content, message, showCursor }: TContentProps) {
  const { isSubmitting, latestMessage } = useChatContext();

  const isInitializing = content === '';

  const { isEdited, messageId } = message ?? {};
  const isLatestMessage = messageId === latestMessage?.messageId;

  let currentContent = content;
  if (!isInitializing) {
    currentContent = currentContent?.replace('z-index: 1;', '') ?? '';
  }

  const rehypePlugins: PluggableList = [
    [rehypeKatex, { output: 'mathml' }],
    [
      rehypeHighlight,
      {
        detect: true,
        ignoreMissing: true,
        subset: langSubset,
      },
    ],
    [rehypeRaw],
  ];

  if (isInitializing) {
    rehypePlugins.pop();
    return (
      <div className='absolute'>
        <p className='relative'>
          <span className={cn(isSubmitting ? 'result-thinking' : '')} />
        </p>
      </div>
    );
  }

  let isValidIframe: string | boolean | null = false;
  if (!isEdited) {
    isValidIframe = validateIframe(currentContent);
  }

  if (isEdited || ((!isInitializing || !isLatestMessage) && !isValidIframe)) {
    rehypePlugins.pop();
  }

  function checkExistingKw(keywordName: string, keyworkMapped: string[]) {
    let existingKw = false;
    for (let i = 0; i < keyworkMapped.length; i++) {
      const regexPattern = new RegExp(`` + keywordName + ``);
      if (keyworkMapped[i].match(regexPattern)) {
        existingKw = true;
        break;
      }
    }
    return existingKw;
  }

  function mappingHyperlink(messageInput: string, referenceRulesProps?: ReferenceRule[]) {
    const reference_rules = referenceRulesProps || [];
    let text = messageInput;
    const keyworkMapped: string[] = [];
    (reference_rules || []).forEach((leg) => {
      const legTitle = leg.title;
      const regexPattern = new RegExp(`` + legTitle + ``, 'i');
      const formatTitle = leg.title;
      // const formatTitle = leg.title.split(' ').join(' ');
      if (text.match(regexPattern) && !checkExistingKw(legTitle, keyworkMapped)) {
        const substitution = `[**${formatTitle}**](${leg.url})`;
        text = text.replace(regexPattern, substitution);
        keyworkMapped.push(legTitle);
      }
    });
    return text;
  }
  return (
    <div className='markdown markdown-with-hyperlink'>
      <ReactMarkdown
        remarkPlugins={[supersub, remarkGfm, [remarkMath, { singleDollarTextMath: true }]]}
        rehypePlugins={rehypePlugins}
        components={
          {
            code,
            a,
            p,
          } as {
            [nodeType: string]: React.ElementType;
          }
        }
      >
        {isLatestMessage && isSubmitting && !isInitializing && showCursor
          ? currentContent
          : mappingHyperlink(currentContent, REFERENCE_RULES)}
      </ReactMarkdown>
      <div>{isLatestMessage && isSubmitting && !isInitializing && showCursor ? <CaretLine /> : null}</div>
    </div>
  );
});

export default Markdown;
