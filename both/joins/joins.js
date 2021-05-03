// Contracts
Contracts.join(Chains, "chain_id", "chain_data", []);
Contracts.join(Chains, "chain_data.name", "chain_data", []);
Contracts.join(Chains, "deployed_at_block", "chain_data", []);

// Addresses
Addresses.join(Chains, "chain_id", "", []);

