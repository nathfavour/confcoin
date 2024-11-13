import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { MySolanaProject } from '../target/types/my_solana_project';

const provider = anchor.Provider.local();
anchor.setProvider(provider);

const program = anchor.workspace.MySolanaProject as Program<MySolanaProject>;

(async () => {
    const baseAccount = anchor.web3.Keypair.generate();

    // Initialize the account
    await program.rpc.initialize(new anchor.BN(1234), {
        accounts: {
            baseAccount: baseAccount.publicKey,
            user: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        },
        signers: [baseAccount],
    });

    // Fetch the account data
    let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Data: ', account.data.toString());

    // Update the account data
    await program.rpc.update(new anchor.BN(5678), {
        accounts: {
            baseAccount: baseAccount.publicKey,
        },
    });

    // Fetch the updated account data
    account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('Updated Data: ', account.data.toString());
})();