/**
 * 라벨 설정 파일들을 자동 생성하는 스크립트
 * labels.config.mjs를 기반으로 labels.json과 labeler.yml을 생성해요.
 * 변경사항이 없으면 파일을 쓰지 않아요.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { LABELS } from '../labels/labels.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_NAMES = Object.freeze({
  LABELER_YML: 'labeler.yml',
  LABELS_JSON: 'labels.json',
});

const ROOT_DIRECTORY = path.resolve(__dirname, '../..');
const GITHUB_DIRECTORY = path.join(ROOT_DIRECTORY, '.github');
const LABELS_DIRECTORY = path.join(GITHUB_DIRECTORY, 'labels');
const LABELS_JSON_PATH = path.join(LABELS_DIRECTORY, FILE_NAMES.LABELS_JSON);
const LABELER_YML_PATH = path.join(LABELS_DIRECTORY, FILE_NAMES.LABELER_YML);

/**
 * 이모지와 값을 조합하여 라벨 이름을 생성해요.
 * @param {string} emoji - 라벨 이모지
 * @param {string} value - 라벨 값
 * @returns {string} 이모지와 값을 조합한 라벨 이름
 */
const formatLabelName = (emoji, value) => {
  return `${emoji} ${value}`;
};

/**
 * 라벨 배열을 JSON 파일 형식 문자열로 변환해요.
 * @param {Array<{color: string, description: string, emoji: string, value: string}>} labels - 변환할 라벨 배열
 * @returns {string} JSON 형식의 문자열
 */
const formatLabelsToJsonString = (labels) => {
  const labelsForJson = labels.map(({ color, description, emoji, value }) => ({
    color,
    description,
    name: formatLabelName(emoji, value),
  }));

  return JSON.stringify(labelsForJson, null, 2) + '\n';
};

/**
 * 라벨 배열을 YAML 파일 형식 문자열로 변환해요.
 * @param {Array<{emoji: string, value: string}>} labels - 변환할 라벨 배열
 * @returns {string} YAML 형식의 문자열 (release는 title 패턴, 나머지는 head-branch 패턴 사용)
 */
const formatLabelsToYamlString = (labels) => {
  const labelerYml = labels
    .map(({ emoji, value }) => {
      const labelName = formatLabelName(emoji, value);
      const pattern = value === 'release' ? `title: ['^release:']` : `head-branch: ['${value}/']`;

      return `${labelName}:\n  - ${pattern}`;
    })
    .join('\n\n');

  return labelerYml + '\n';
};

const newLabelsJsonContent = formatLabelsToJsonString(LABELS);
const newLabelerYmlContent = formatLabelsToYamlString(LABELS);

/**
 * 파일을 안전하게 읽어요. 파일이 없거나 읽기 실패 시 빈 문자열을 반환해요.
 * @param {string} filePath - 읽을 파일 경로
 * @returns {string} 파일 내용 또는 빈 문자열
 */
const readFileSafe = (filePath) => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return '';
  }
};

const existingLabelsJson = readFileSafe(LABELS_JSON_PATH);
const existingLabelerYml = readFileSafe(LABELER_YML_PATH);

/**
 * 변경사항이 있을 때만 파일을 써요.
 * @param {string} filePath - 쓸 파일 경로
 * @param {string} newContent - 새로운 파일 내용
 * @param {string} existingContent - 기존 파일 내용
 * @returns {boolean} 파일이 변경되었는지 여부
 */
const writeFileIfChanged = (filePath, newContent, existingContent) => {
  if (existingContent !== newContent) {
    fs.writeFileSync(filePath, newContent);

    return true;
  }

  return false;
};

const hasLabelsJsonChanged = writeFileIfChanged(
  LABELS_JSON_PATH,
  newLabelsJsonContent,
  existingLabelsJson,
);

const hasLabelerYmlChanged = writeFileIfChanged(
  LABELER_YML_PATH,
  newLabelerYmlContent,
  existingLabelerYml,
);

const CONSOLE_MESSAGES = Object.freeze({
  SKIPPED: 'ℹ️ 변경사항이 없어요.',
  SUCCESS: `✅ ${FILE_NAMES.LABELS_JSON}과 ${FILE_NAMES.LABELER_YML}이 성공적으로 생성되었어요.`,
});

const hasChanges = hasLabelsJsonChanged || hasLabelerYmlChanged;
const message = hasChanges ? CONSOLE_MESSAGES.SUCCESS : CONSOLE_MESSAGES.SKIPPED;

console.log(message);
