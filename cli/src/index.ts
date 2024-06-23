#!/usr/bin/env node
import { run_questionaire } from '$src/questionaire.js';
import { get_user_pkg_manager } from '$src/utility/get-user-pkg-manager.js';
import { logger } from '$src/utility/logger.js';
import { render_title } from '$src/utility/render-title.js';
import { type PackageJson } from 'type-fest';

type SvAppPackageJSON = PackageJson & {
	SvAppMetadata?: {
		initVersion: string;
	};
};

const main = async () => {
	const pkg_manager = get_user_pkg_manager();

	render_title();

	const opts = await run_questionaire();

	console.log('opts:in::', JSON.stringify(opts, null, 2));

	process.exit(0);
};

main().catch((err) => {
	logger.error('Aborting installation...');
	if (err instanceof Error) {
		logger.error(err);
	} else {
		logger.error('An unknown error has occurred. Please open an issue on github with the below:');
		console.log(err);
	}
	process.exit(1);
});
