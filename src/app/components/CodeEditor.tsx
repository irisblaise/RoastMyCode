'use client';

import { type FC, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { CodeEditorProps } from '@/types/components';

const CodeEditor: FC<CodeEditorProps> = ({
  onSubmit,
  isLoading = false,
  defaultValue = '',
  placeholder = '// Enter your code here...'
}) => {
  const [code, setCode] = useState<string>(defaultValue);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!code.trim()) {
      setError('Please enter some code before submitting');
      return;
    }
    onSubmit(code);
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900/80">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="text-gray-400 text-sm font-medium">JavaScript</div>
        </div>
        <CodeMirror
          value={code}
          height="400px"
          theme={vscodeDark}
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => {
            setCode(value);
            if (error) setError(null);
          }}
          placeholder={placeholder}
          className="text-base"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightActiveLine: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            tabSize: 2,
          }}
        />
      </div>

      {error && (
        <div className="bg-red-50/50 backdrop-blur-sm text-red-600 p-4 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isLoading || !code.trim()}
          className="group relative px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-medium shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden transition-all duration-200"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <span className="relative">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            ) : (
              'Roast My Code'
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default CodeEditor;
