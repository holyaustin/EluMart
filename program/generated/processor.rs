// This file is auto-generated from the CIDL source.
// Editing this file directly is not recommended as it may be overwritten.

use std::str::FromStr;
use borsh::BorshSerialize;
use solana_program::account_info::{AccountInfo, next_account_info, next_account_infos};
use solana_program::borsh0_10::try_from_slice_unchecked;
use solana_program::entrypoint::ProgramResult;
use solana_program::program::{invoke, invoke_signed};
use solana_program::pubkey::Pubkey;
use solana_program::rent::Rent;
use solana_program::system_instruction::create_account;
use solana_program::{msg, system_program};
use solana_program::sysvar::Sysvar;
use solana_program::program_pack::Pack;
use crate::generated::errors::ElumartError;
use crate::generated::instructions::ElumartInstruction;

use crate::generated::state::{
	Account,
	AccountPDA,
	Record,
};
use crate::src::*;

pub struct Processor;

impl Processor {
    pub fn process(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        data: &[u8],
    ) -> ProgramResult {
        let instruction = ElumartInstruction::unpack(data)?;

        match instruction {
			ElumartInstruction::CreateUser(args) => {
				msg!("Instruction: CreateUser");
				Self::process_create_user(
					program_id,
					accounts, 
					args.user_name,
					args.profile_url,
					args.user_record_seed_signer,
				)
			}
        }
    }

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
	pub fn process_create_user(
		program_id: &Pubkey,
		accounts: &[AccountInfo],
		user_name: String,
		profile_url: String,
		user_record_seed_signer: Pubkey,
	) -> ProgramResult {
		let account_info_iter = &mut accounts.iter();
		let fee_payer_info = next_account_info(account_info_iter)?;
		let user_record_info = next_account_info(account_info_iter)?;
		let system_program_info = next_account_info(account_info_iter)?;

		// Derive PDAs
		let (user_record_pubkey, user_record_bump) = Pubkey::find_program_address(
			&[b"record", user_record_seed_signer.as_ref()],
			program_id,
		);

		// Security Checks
		if fee_payer_info.is_signer != true {
			return Err(ElumartError::InvalidSignerPermission.into());
		}

		if *user_record_info.key != user_record_pubkey {
			return Err(ElumartError::NotExpectedAddress.into());
		}

		if *system_program_info.key != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(ElumartError::NotExpectedAddress.into());
		}


		// Accounts Initializations
		if user_record_info.lamports() == 0 && *user_record_info.owner == system_program::id() {
			let space = Record::LEN;
			let rent = Rent::get()?;
			let rent_minimum_balance = rent.minimum_balance(space);

			invoke_signed(
				&create_account(
					&fee_payer_info.key,
					&user_record_info.key,
					rent_minimum_balance,
					space as u64,
					program_id,
				),
				&[fee_payer_info.clone(), user_record_info.clone()],
				&[&[b"record", user_record_seed_signer.as_ref(), &[user_record_bump]]],
			)?;
		}


		// Security Checks
		if *fee_payer_info.owner != Pubkey::from_str("11111111111111111111111111111111").unwrap() {
			return Err(ElumartError::WrongAccountOwner.into());
		}

		if user_record_info.data_len() != Record::LEN {
			return Err(ElumartError::InvalidAccountLen.into());
		}


		// Accounts Deserialization
		let user_record = &mut AccountPDA::new(
			&user_record_info,
			try_from_slice_unchecked::<Record>(&user_record_info.data.borrow()).unwrap(),
			user_record_bump,
		);

		// Calling STUB
		create_user::create_user(
			program_id,
			user_record,
			user_name,
			profile_url,
		)?;

		// Accounts Serialization
		user_record.data.serialize(&mut &mut user_record_info.data.borrow_mut()[..])?;
		
		Ok(())
	}
}