"use client"

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

interface SuggestionsInputProps extends React.ComponentProps<"input"> {
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
}

export function SuggestionsInput({
  suggestions = [],
  onSuggestionClick,
  onChange,
  value: controlledValue,
  ...props
}: SuggestionsInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState(controlledValue?.toString() || "");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof controlledValue !== 'undefined') {
      setValue(controlledValue.toString());
    }
  }, [controlledValue]);

  useEffect(() => {
    // Handle clicks outside the component to hide suggestions
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.trim() === "") {
      setIsVisible(false);
      setFilteredSuggestions([]);
    } else {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setIsVisible(filtered.length > 0);
    }

    if (onChange) {
      onChange(e);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    setIsVisible(false);

    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }

    // Create a synthetic event to simulate onChange
    if (onChange && inputRef.current) {
      const event = Object.create(new Event('change', { bubbles: true }));
      Object.defineProperty(event, 'target', { value: { value: suggestion } });
      onChange(event as any);
    }

    // Keep focus on the input
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <Input
        {...props}
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        onFocus={() => {
          if (value.trim() !== "" && filteredSuggestions.length > 0) {
            setIsVisible(true);
          }
        }}
      />

      {isVisible && filteredSuggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-glass border border-neutral-300 max-h-60 overflow-auto">
          <div className="py-1">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full px-4 py-2 text-left hover:bg-neutral-50/20 text-white"
                onMouseDown={(e) => {
                  // Prevent the input from losing focus
                  e.preventDefault();
                }}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}