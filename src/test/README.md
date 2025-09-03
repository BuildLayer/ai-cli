# CLI Package Tests

This directory contains comprehensive tests for the AI UI SDK CLI package.

## Test Structure

```text
src/test/
├── setup.ts                 # CLI test setup and mocks
├── cli.test.ts              # CLI command tests
└── README.md               # This file
```

## Test Categories

### 1. CLI Command Tests (`cli.test.ts`)

Tests the CLI command functionality:

#### Project Creation Tests

- **Default Options**: Project creation with default settings
- **TypeScript Option**: Project creation with/without TypeScript
- **Tailwind Option**: Project creation with/without Tailwind
- **Error Handling**: Project creation error handling
- **File Structure**: Generated project file structure

#### Project Building Tests

- **Build Success**: Successful project building
- **Build Errors**: Build error handling
- **Non-existent Project**: Handling non-existent projects
- **Build Process**: Build process execution

#### Project Testing Tests

- **Test Success**: Successful test execution
- **Test Failures**: Test failure handling
- **Test Process**: Test process execution
- **Test Environment**: Test environment setup

#### Template Generation Tests

- **Basic Template**: Basic template generation
- **TypeScript Template**: TypeScript template generation
- **Tailwind Template**: Tailwind template generation
- **Template Structure**: Generated template structure
- **Package.json**: Package.json generation
- **Configuration Files**: Configuration file generation
- **Component Files**: Component file generation
- **Error Handling**: Template generation error handling

## Running Tests

### Run All CLI Tests

```bash
cd packages/cli
pnpm test
```

### Run Specific Test Files

```bash
# Run CLI tests
pnpm test cli.test.ts
```

### Run Tests with Coverage

```bash
pnpm test --coverage
```

### Run Tests in Watch Mode

```bash
pnpm test --watch
```

## Test Setup

The `setup.ts` file configures the CLI test environment:

- **Child Process Mocking**: Process execution mocking
- **File System Mocking**: File system operations mocking
- **Path Mocking**: Path operations mocking
- **OS Mocking**: Operating system operations mocking
- **Console Mocking**: Console output mocking

## Mock Data

Tests use realistic mock data:

- **Project Configurations**: Different project configurations
- **Template Data**: Template generation data
- **File Structures**: Generated file structures
- **Package.json**: Package.json configurations
- **Configuration Files**: Various configuration files

## Test Utilities

### CLI Testing Utilities

- **Process Mocking**: Process execution mocking
- **File System Mocking**: File system operations mocking
- **Path Utilities**: Path operation utilities
- **OS Utilities**: Operating system utilities

### Custom Test Utilities

- **Mock Commands**: Pre-configured command mocks
- **Test Data**: Reusable test data and fixtures
- **File Utilities**: File operation utilities
- **Assertions**: Custom assertions for CLI testing

## Best Practices

### Writing CLI Tests

1. **Test Command Execution**: Focus on command execution behavior
2. **Test File Operations**: Verify file system operations
3. **Test Error Handling**: Include error scenarios and recovery
4. **Mock External Dependencies**: Mock external processes and file systems
5. **Test Output Format**: Verify command output and results

### CLI Testing

1. **Test Command Creation**: Verify command creation and configuration
2. **Test Command Execution**: Test command execution functionality
3. **Test File Generation**: Test file generation and structure
4. **Test Error Handling**: Test error handling and recovery
5. **Test User Interaction**: Test user interaction and prompts

### Template Testing

1. **Test Template Generation**: Verify template generation
2. **Test File Structure**: Test generated file structure
3. **Test Configuration**: Test configuration file generation
4. **Test Dependencies**: Test dependency management
5. **Test Customization**: Test template customization options

## Test Patterns

### CLI Test Pattern

```typescript
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createProject } from '../commands';

describe('CLI Commands', () => {
  let tempDir: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-'));
  });

  afterEach(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('should create project with default options', async () => {
    const projectPath = path.join(tempDir, 'test-project');
    
    await createProject({
      name: 'test-project',
      template: 'basic',
      directory: projectPath,
      typescript: true,
      tailwind: true
    });

    expect(fs.existsSync(projectPath)).toBe(true);
    expect(fs.existsSync(path.join(projectPath, 'package.json'))).toBe(true);
  });
});
```

### Template Test Pattern

```typescript
import { describe, it, expect } from 'vitest';
import { createBasicTemplate } from '../templates/basic';

describe('Basic Template', () => {
  it('should create basic template with TypeScript and Tailwind', async () => {
    await createBasicTemplate({
      name: 'test-project',
      directory: tempDir,
      typescript: true,
      tailwind: true
    });

    // Check package.json
    const packageJson = JSON.parse(fs.readFileSync(path.join(tempDir, 'package.json'), 'utf8'));
    expect(packageJson.name).toBe('test-project');
    expect(packageJson.dependencies).toHaveProperty('react');
  });
});
```

## Troubleshooting

### Common Issues

1. **File System Issues**: Check file system mocking and permissions
2. **Process Issues**: Verify process execution mocking
3. **Path Issues**: Check path resolution and mocking
4. **Template Issues**: Verify template generation and structure

### Debugging

1. **Check File Operations**: Verify file system operations
2. **Review Process Execution**: Check process execution mocking
3. **Validate Paths**: Verify path resolution and operations
4. **Test Template Generation**: Test template generation in isolation

## Coverage

### Coverage Targets

- **Statements**: > 90%
- **Branches**: > 85%
- **Functions**: > 90%
- **Lines**: > 90%

### Coverage Reports

Coverage reports are generated in the `coverage/` directory:

- **HTML Report**: `coverage/index.html`
- **JSON Report**: `coverage/coverage-final.json`
- **Text Report**: Console output

## Contributing

### Adding New Tests

1. **Follow Naming Convention**: Use descriptive test names
2. **Add to Appropriate File**: Add tests to the most relevant test file
3. **Update Documentation**: Update this README if adding new test categories
4. **Ensure Coverage**: Verify new tests improve coverage

### Test Review

1. **Code Review**: All tests are reviewed with code changes
2. **Quality Gates**: Test quality is enforced in reviews
3. **Best Practices**: Follow established testing best practices
4. **Documentation**: Keep test documentation up to date
