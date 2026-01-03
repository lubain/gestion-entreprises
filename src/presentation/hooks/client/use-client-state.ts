import { useEffect, useState } from "react";
import { useClient } from "./use-client";

export const useClientState = () => {
  const { clients, create: addClient, getAll } = useClient();
  const [isAdding, setIsAdding] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    getAll();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addClient(newClient);
    setIsAdding(false);
    setNewClient({ name: "", email: "", phone: "", address: "" });
  };

  return {
    isAdding,
    clients,
    newClient,
    setIsAdding,
    setNewClient,
    handleSubmit,
  };
};
