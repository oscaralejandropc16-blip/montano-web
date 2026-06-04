"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, Check } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchableSelect({ options, value, onChange, placeholder = "Seleccionar..." }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizeString = (str: string) => 
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filteredOptions = options.filter(opt => 
    normalizeString(opt.label).includes(normalizeString(searchTerm))
  );

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div 
        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs font-medium text-black focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary flex items-center justify-between cursor-pointer shadow-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate pr-4">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 flex flex-col overflow-hidden">
          <div className="p-2 border-b border-gray-100 flex items-center gap-2 text-gray-500 bg-gray-50/50">
            <Search className="w-4 h-4 flex-shrink-0" />
            <input 
              type="text" 
              className="w-full bg-transparent text-xs focus:outline-none text-black"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <div className="overflow-y-auto flex-1 p-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-gray-400">No hay resultados</div>
            ) : (
              filteredOptions.map(opt => (
                <div 
                  key={opt.value}
                  className={`px-3 py-2 text-xs rounded-lg cursor-pointer flex items-center justify-between ${opt.value === value ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <span className="truncate pr-4">{opt.label}</span>
                  {opt.value === value && <Check className="w-4 h-4 flex-shrink-0" />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
