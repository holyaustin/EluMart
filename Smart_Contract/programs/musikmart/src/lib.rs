use anchor_lang::prelude::*;
use anchor_lang::solana_program::log::sol_log_compute_units;
use anchor_lang::solana_program::entrypoint::ProgramResult;
use std::mem::size_of;

declare_id!("9P8wQVP39pAauwbh9y1zv34sdcreXsdLeeojv4hrWc7W");

// Video and comment text length
//const TEXT_LENGTH: usize = 1024;

const USER_NAME_LENGTH: usize = 100;

//const USER_URL_LENGTH: usize = 255;

/// MusicMart program
#[program]
pub mod musikmart {
    use super::*;

    pub fn create_user(
        ctx: Context<CreateUser>,
        name: String,
        profile_url: String,
    ) -> ProgramResult {
        let user = &mut ctx.accounts.user;
        // Set authority
        user.user_wallet_address = ctx.accounts.authority.key();
        // Set name
        user.user_name = name;
        // Set profile
        user.user_profile_image_url = profile_url;

        msg!("User Added!");
        sol_log_compute_units();
        Ok(())
    }
}

////////////////////////////////// STRUCT /////////////////////

#[derive(Accounts)]
pub struct CreateUser<'info> {
    #[account(
        init,
        seeds = [b"user".as_ref(), authority.key().as_ref()],
        bump,
        payer = authority,
        space = size_of::<UserAccount>() + USER_NAME_LENGTH  + 8
    )]
    pub user: Account<'info, UserAccount>,

    // Authority (this is the signer who paid the transaction fee)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// System program
    /// CHECK: Simple test account for MusicMart
    pub system_program: UncheckedAccount<'info>,

    // Clock to save time
    pub clock: Sysvar<'info, Clock>,
}

#[account]
pub struct UserAccount {
    pub user_name: String,
    pub user_wallet_address: Pubkey,
    pub user_profile_image_url: String,
}
