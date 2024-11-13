use anchor_lang::prelude::*;

declare_id!("G7kHPReQDeYW9UJUpxczzHvCHYDnvWLjMjh56e73tBjV");

#[program]
pub mod confcoin {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
