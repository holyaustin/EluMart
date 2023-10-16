// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::program_error::ProgramError;
use solana_program::pubkey::Pubkey;
use crate::generated::errors::ElumartError;

#[derive(BorshSerialize, Debug)]
pub enum ElumartInstruction {
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
	CreateUser(CreateUserArgs),

}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct CreateUserArgs {
	pub user_name: String,
	pub profile_url: String,
	pub user_record_seed_signer: Pubkey,
}

impl ElumartInstruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (&variant, rest) = input.split_first().ok_or(ElumartError::InvalidInstruction)?;

        Ok(match variant {
			0 => Self::CreateUser(CreateUserArgs::try_from_slice(rest).unwrap()),
			_ => return Err(ElumartError::InvalidInstruction.into())
        })
    }
}