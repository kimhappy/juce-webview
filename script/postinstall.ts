import { version  } from '../package.json'
import { rmSync   } from 'fs'
import { execSync } from 'child_process'

const juceRepoUrl = 'https://github.com/juce-framework/JUCE'

rmSync('JUCE', { recursive: true, force: true })
execSync(`git clone --depth 1 --branch ${ version } ${ juceRepoUrl } JUCE`, { stdio: 'inherit' })
