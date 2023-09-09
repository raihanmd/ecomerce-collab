import React, { useState } from "react";
import { Input, Popover, PopoverTrigger, PopoverContent, PopoverBody, List, ListItem } from "@chakra-ui/react";

const Autocomplete = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter((option) => option.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSelect = (option) => {
    setSearchTerm(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen} onOpen={() => setIsOpen(true)} onClose={() => setIsOpen(false)}>
      <PopoverTrigger>
        <Input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
      </PopoverTrigger>
      <PopoverContent width="100%">
        <PopoverBody padding={0}>
          <List spacing={0}>
            {filteredOptions.map((option) => (
              <ListItem key={option?.provinded_id || option?.city_id} cursor="pointer" _hover={{ bg: "gray.100" }} onClick={() => handleSelect(option)}>
                {option?.province || option?.city}
              </ListItem>
            ))}
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Autocomplete;
