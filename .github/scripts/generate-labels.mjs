/**
 * labels.config.mjs를 기반으로 labels.json과 labeler.yml을 생성해요.
 * 변경 감지는 워크플로의 `git status --porcelain`이 담당해요.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { LABELS } from '../labels/labels.config.mjs';

const LABELS_DIRECTORY = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../labels');

const formatLabelName = (emoji, value) => `${emoji} ${value}`;

const labelsJson = LABELS.map(({ color, description, emoji, value }) => ({
  color,
  description,
  name: formatLabelName(emoji, value),
}));

const getHeadBranchPattern = ({ isCommitType, value }) => {
  if (isCommitType) {
    return `^${value}/`;
  }

  if (value === 'release') {
    return '^changeset-release/';
  }

  return null;
};

const labelerYml = LABELS.map((label) => {
  const pattern = getHeadBranchPattern(label);

  if (!pattern) {
    return null;
  }

  return `${formatLabelName(label.emoji, label.value)}:\n  - head-branch: ['${pattern}']`;
})
  .filter(Boolean)
  .join('\n\n');

fs.writeFileSync(
  path.join(LABELS_DIRECTORY, 'labels.json'),
  `${JSON.stringify(labelsJson, null, 2)}\n`,
);
fs.writeFileSync(path.join(LABELS_DIRECTORY, 'labeler.yml'), `${labelerYml}\n`);

console.log('✅ labels.json과 labeler.yml을 생성했어요.');
