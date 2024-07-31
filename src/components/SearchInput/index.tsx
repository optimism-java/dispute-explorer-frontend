import { FormEventHandler, HTMLAttributes, useState } from "react";
import { Button } from "../Button";
import { Input } from "../Input";
// import { useDebounce } from "@/hooks/useDebounce";
// import { useClickOutside } from "@/hooks/useClickOutside";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";

type SearchInputProps = {
  className?: HTMLAttributes<HTMLInputElement>["className"];
  noIconButton?: boolean;
};

export const SearchInput: React.FC<SearchInputProps> = function ({
  className,
}: SearchInputProps) {
  const [term, setTerm] = useState<string>("");
  const router = useRouter();
  const handleSubmit: FormEventHandler<HTMLFormElement | HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    void router.push(`/game/${term}`);
  };

  return (
    <form onSubmit={handleSubmit}>
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
