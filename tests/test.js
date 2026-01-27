/**
 * DevTrace Test Suite
 * Automated tests for quality score calculation and API endpoints
 * 
 * This demonstrates:
 * - Unit testing
 * - Test case design
 * - Automated validation
 */

const { calculateQualityScore } = require('../server.js');

// Simple test framework
class TestRunner {
    constructor(name) {
        this.name = name;
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }

    test(description, fn) {
        this.tests.push({ description, fn });
    }

    async run() {
        console.log('\n' + '='.repeat(60));
        console.log(`🧪 Running Test Suite: ${this.name}`);
        console.log('='.repeat(60) + '\n');

        for (const test of this.tests) {
            try {
                await test.fn();
                this.passed++;
                console.log(`✅ PASS: ${test.description}`);
            } catch (error) {
                this.failed++;
                console.log(`❌ FAIL: ${test.description}`);
                console.log(`   Error: ${error.message}\n`);
            }
        }

        this.printSummary();
    }

    printSummary() {
        console.log('\n' + '='.repeat(60));
        console.log('Test Summary:');
        console.log('='.repeat(60));
        console.log(`Total Tests: ${this.tests.length}`);
        console.log(`✅ Passed: ${this.passed}`);
        console.log(`❌ Failed: ${this.failed}`);
        console.log(`Success Rate: ${((this.passed / this.tests.length) * 100).toFixed(1)}%`);
        console.log('='.repeat(60) + '\n');

        // Exit with appropriate code
        process.exit(this.failed > 0 ? 1 : 0);
    }
}

// Assertion helper
function assertEquals(actual, expected, message) {
    if (actual !== expected) {
        throw new Error(
            message || `Expected ${expected}, but got ${actual}`
        );
    }
}

function assertTrue(condition, message) {
    if (!condition) {
        throw new Error(message || 'Expected condition to be true');
    }
}

// Create test suite
const suite = new TestRunner('DevTrace Quality Score Tests');

// Test Case 1: Passed tests with low complexity (optimal scenario)
suite.test('Quality Score: Passed + Low Complexity = 90', () => {
    const score = calculateQualityScore('Passed', 'Low');
    assertEquals(score, 90, 'Optimal scenario should score 90');
});

// Test Case 2: Failed tests should significantly reduce score
suite.test('Quality Score: Failed + Medium Complexity < 50', () => {
    const score = calculateQualityScore('Failed', 'Medium');
    assertTrue(score < 50, 'Failed tests should result in low quality score');
});

// Test Case 3: High complexity without tests (worst case)
suite.test('Quality Score: High Complexity + Not Tested = 30', () => {
    const score = calculateQualityScore('Not Tested', 'High');
    assertEquals(score, 30, 'High complexity without tests should score 30');
});

// Test Case 4: Passed tests improve score regardless of complexity
suite.test('Quality Score: Passed tests always increase score', () => {
    const lowScore = calculateQualityScore('Passed', 'Low');
    const mediumScore = calculateQualityScore('Passed', 'Medium');
    const highScore = calculateQualityScore('Passed', 'High');

    assertTrue(lowScore > 70, 'Passed + Low should be high quality');
    assertTrue(mediumScore > 70, 'Passed + Medium should be high quality');
    assertTrue(highScore > 50, 'Passed + High should be above average');
});

// Test Case 5: Score boundaries (0-100)
suite.test('Quality Score: Always between 0 and 100', () => {
    const testCases = [
        ['Passed', 'Low'],
        ['Passed', 'Medium'],
        ['Passed', 'High'],
        ['Failed', 'Low'],
        ['Failed', 'Medium'],
        ['Failed', 'High'],
        ['Not Tested', 'Low'],
        ['Not Tested', 'Medium'],
        ['Not Tested', 'High']
    ];

    testCases.forEach(([testStatus, complexity]) => {
        const score = calculateQualityScore(testStatus, complexity);
        assertTrue(
            score >= 0 && score <= 100,
            `Score ${score} for ${testStatus}+${complexity} should be between 0-100`
        );
    });
});

// Test Case 6: Not tested tasks should have lower scores
suite.test('Quality Score: Not Tested < Passed for same complexity', () => {
    const notTestedLow = calculateQualityScore('Not Tested', 'Low');
    const passedLow = calculateQualityScore('Passed', 'Low');

    assertTrue(
        notTestedLow < passedLow,
        'Not tested should score lower than passed tests'
    );
});

// Test Case 7: Low complexity is better than high complexity
suite.test('Quality Score: Low Complexity > High Complexity for same test status', () => {
    const lowComplexity = calculateQualityScore('Passed', 'Low');
    const highComplexity = calculateQualityScore('Passed', 'High');

    assertTrue(
        lowComplexity > highComplexity,
        'Low complexity should score higher than high complexity'
    );
});

// Test Case 8: Failed tests are risky regardless of complexity
suite.test('Quality Score: Failed tests always result in score < 50', () => {
    const failedLow = calculateQualityScore('Failed', 'Low');
    const failedMedium = calculateQualityScore('Failed', 'Medium');
    const failedHigh = calculateQualityScore('Failed', 'High');

    assertTrue(failedLow < 50, 'Failed + Low should be < 50');
    assertTrue(failedMedium < 50, 'Failed + Medium should be < 50');
    assertTrue(failedHigh < 50, 'Failed + High should be < 50');
});

// Test Case 9: Medium complexity baseline
suite.test('Quality Score: Medium complexity provides balanced scores', () => {
    const notTestedMedium = calculateQualityScore('Not Tested', 'Medium');
    const passedMedium = calculateQualityScore('Passed', 'Medium');

    assertTrue(
        notTestedMedium >= 40 && notTestedMedium <= 60,
        'Not tested + Medium should be around 50'
    );
    assertTrue(
        passedMedium >= 70 && passedMedium <= 90,
        'Passed + Medium should be high quality'
    );
});

// Test Case 10: Edge case validation
suite.test('Quality Score: Validates edge cases', () => {
    // Best case
    const best = calculateQualityScore('Passed', 'Low');
    assertEquals(best, 90, 'Best case should be 90');

    // Worst case
    const worst = calculateQualityScore('Not Tested', 'High');
    assertEquals(worst, 30, 'Worst case should be 30');

    // Middle ground
    const middle = calculateQualityScore('Not Tested', 'Medium');
    assertTrue(middle >= 40 && middle <= 60, 'Middle case should be around 50');
});

// Run all tests
suite.run();