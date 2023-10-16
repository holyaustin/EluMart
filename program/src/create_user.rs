use solana_program::account_info::AccountInfo;
use solana_program::entrypoint::ProgramResult;
use solana_program::pubkey::Pubkey;

use crate::generated::state::{
	AccountPDA,
	Record,
};


/// To call once per account. Initialize a Record account. T
///
/// Accounts:
/// 0. `[writable, signer]` fee_payer: [AccountInfo] Auto-generated, default fee payer
/// 1. `[writable]` user_record: [Record] 
/// 2. `[]` system_program: [AccountInfo] Auto-generated, for account initialization
///
/// Data:
/// - user_name: [String] The username to be assigned to the Record.name property
/// - profile_url: [String] The user profile url
/// - user_record_seed_signer: [Pubkey] Auto-generated, from input user_record of type [Record] set the seed named signer, required by the type
pub fn create_user(
	program_id: &Pubkey,
	user_record: &mut AccountPDA<Record>,
	user_name: String,
	profile_url: String,
) -> ProgramResult {
    // Implement your business logic here...






    Ok(())
}