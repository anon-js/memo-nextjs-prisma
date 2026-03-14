"use client";

import React, { createContext, useContext, useState, useRef, useEffect, forwardRef } from "react";
import { Trigger } from "./components/Trigger";
import { List } from "./components/List";
import { Item } from "./components/Item";
import { Separator } from "./components/Separator";

interface DropdownContextProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextProps | null>(null);

export const useDropdown = () => {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("Dropdown sub-components must be used within a Dropdown");
  return context;
};

interface DropdownRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const DropdownRoot = forwardRef<HTMLDivElement, DropdownRootProps>(
  ({ children, className = "", ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const internalRef = useRef<HTMLDivElement>(null);

    const setRefs = (node: HTMLDivElement) => {
      internalRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (internalRef.current && !internalRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
        <div 
          ref={setRefs}
          className={`relative inline-block z-9999 ${className}`} 
          {...props}
        >
          {children}
        </div>
      </DropdownContext.Provider>
    );
  }
);

DropdownRoot.displayName = "Dropdown";

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger,
  List,
  Item,
  Separator,
});