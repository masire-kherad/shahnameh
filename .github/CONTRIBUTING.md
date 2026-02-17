# Contributing to MasireKherad

Thank you for your interest in contributing to MasireKherad (مسیر خرد)! This document provides guidelines and instructions for contributing to the project.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue using the [Bug Report template](.github/ISSUE_TEMPLATE/bug_report.md). Include:

- A clear description of the bug
- Steps to reproduce the issue
- Expected vs. actual behavior
- Screenshots (if applicable)
- Device/platform information (iOS, Android, Web)
- App version

### Suggesting Features

We welcome feature suggestions! Please use the [Feature Request template](.github/ISSUE_TEMPLATE/feature_request.md) and include:

- A clear description of the feature
- Why this feature would be useful
- Any mockups or examples (if applicable)

### Code Contributions

1. **Fork the repository** and clone your fork
2. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```
3. **Make your changes** following our coding standards:
   - Use TypeScript for type safety
   - Follow the existing code style
   - Write clear, descriptive commit messages
   - Test your changes on multiple platforms if possible
4. **Run linting**:
   ```bash
   npm run lint
   ```
5. **Commit your changes**:
   ```bash
   git commit -m "Description of your changes"
   ```
6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request** using the PR template

### Coding Standards

- **TypeScript**: Use TypeScript for all new code
- **Naming**: Use descriptive names for variables, functions, and components
- **Comments**: Add comments for complex logic
- **Formatting**: Follow the existing code style (use Prettier if configured)
- **Components**: Keep components focused and reusable
- **RTL Support**: Remember this app supports Persian (RTL) text

### Project Structure

```
shahname/
├── app/              # App screens (file-based routing with Expo Router)
├── components/       # Reusable React components
├── assets/          # Images, fonts, and data files
├── constants/       # App constants and themes
├── hooks/           # Custom React hooks
├── services/        # Business logic and data services
├── types/           # TypeScript type definitions
└── public/          # Web-specific assets
```

### Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

3. Run on your preferred platform:
   - iOS: Press `i` or scan QR code
   - Android: Press `a` or scan QR code
   - Web: Press `w`

### Building

To build for production:

```bash
# Android
eas build --platform android --profile production

# iOS (requires Apple Developer account)
eas build --platform ios --profile production
```

## Questions?

If you have questions or need help, please:
- Open an issue with the "question" label
- Contact us via Instagram (mentioned in the app)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Respect different viewpoints and experiences

Thank you for contributing to MasireKherad! 🎉
