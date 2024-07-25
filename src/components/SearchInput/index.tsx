import { HTMLAttributes, useRef, useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
// import { useDebounce } from "@/hooks/useDebounce";
// import { useClickOutside } from "@/hooks/useClickOutside";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

type SearchInputProps = {
  className?: HTMLAttributes<HTMLInputElement>["className"];
  noIconButton?: boolean;
};

export const SearchInput: React.FC<SearchInputProps> = function ({
  className,
}: SearchInputProps) {
  const [term, setTerm] = useState<string>("");
  // const debouncedTerm = useDebounce(term, 600);
  const searchRef = useRef<HTMLFormElement>(null);
  // const clickOutside = useClickOutside(searchRef);

  const handleSubmit = () => {
    // TODO
  };

  return (
    <form ref={searchRef} onSubmit={handleSubmit}>
      <div
        className={`relative flex rounded-md border-border-light shadow-sm dark:border-border-dark ${className}`}
      >
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <Input
            type="text"
            name="search"
            id="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className={"rounded-none rounded-l-md"}
            placeholder={`Search by Game Address`}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          onClick={handleSubmit}
          className={`
              relative
              -ml-px
              inline-flex
              items-center
              gap-x-1.5
              rounded-l-none
              rounded-r-md
              font-semibold
              ring-1
              ring-inset
              `}
          icon={
            <MagnifyingGlassIcon
              className="-ml-0.5 h-5 w-5"
              aria-hidden="true"
            />
          }
          size="md"
        />
      </div>
    </form>
  );
};
