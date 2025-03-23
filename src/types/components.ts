export interface CodeEditorProps {
    onSubmit: (code: string) => void;
    isLoading?: boolean;
    defaultValue?: string;
    placeholder?: string;
  }