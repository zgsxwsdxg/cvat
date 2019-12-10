/*
 * Copyright (C) 2019 Intel Corporation
 * SPDX-License-Identifier: MIT
*/

/* global
    require:false
    jest:false
    describe:false
*/

// Setup mock for a server
jest.mock('../../src/server-proxy', () => {
    const mock = require('../mocks/server-proxy.mock');
    return mock;
});

// Initialize api
window.cvat = require('../../src/api');

const { Project } = require('../../src/session');


// Test cases
describe('Feature: get a list of projects', () => {
    test('get all projects', async () => {
        const result = await window.cvat.projects.get();
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toHaveLength(7);
        for (const el of result) {
            expect(el).toBeInstanceOf(Project);
        }
    });

    test('get a project by an id', async () => {
        const result = await window.cvat.projects.get({
            id: 3,
        });
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toHaveLength(1);
        expect(result[0]).toBeInstanceOf(Project);
        expect(result[0].id).toBe(3);
    });

    test('get a project by an unknown id', async () => {
        const result = await window.cvat.projects.get({
            id: 50,
        });
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toHaveLength(0);
    });

    test('get a project by an invalid id', async () => {
        expect(window.cvat.projects.get({
            id: '50',
        })).rejects.toThrow(window.cvat.exceptions.ArgumentError);
    });

    test('get projects by filters', async () => {
        const result = await window.cvat.projects.get({
            owner: 'admin',
        });
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toHaveLength(3);
        for (const el of result) {
            expect(el).toBeInstanceOf(Project);
            expect(el.owner.username).toBe('admin');
        }
    });

    test('get projects by invalid filters', async () => {
        expect(window.cvat.projects.get({
            unknown: '5',
        })).rejects.toThrow(window.cvat.exceptions.ArgumentError);
    });

    test('get project by name, status', async () => {
        const result = await window.cvat.projects.get({
            status: 'annotation',
            name: 'Test Project',
        });
        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toHaveLength(1);
        for (const el of result) {
            expect(el).toBeInstanceOf(Project);
            expect(el.status).toBe('annotation');
            expect(el.name).toBe('Test Project');
        }
    });
});

describe('Feature: save a project', () => {
    test('save some changed fields in a project', async () => {
        let result = await window.cvat.projects.get({
            id: 2,
        });

        result[0].bugTracker = 'newBugTracker';
        result[0].name = 'New Project Name';

        result[0].save();

        result = await window.cvat.projects.get({
            id: 2,
        });

        expect(result[0].bugTracker).toBe('newBugTracker');
        expect(result[0].name).toBe('New Project Name');
    });

    test('save new project without an id', async () => {
        const project = new window.cvat.classes.Project({
            name: 'New Project',
            bug_tracker: 'bug tracker value',
        });

        const result = await project.save();
        expect(typeof (result.id)).toBe('number');
    });
});

describe('Feature: delete a project', () => {
    test('delete a project', async () => {
        let result = await window.cvat.projects.get({
            id: 3,
        });

        await result[0].delete();
        result = await window.cvat.projects.get({
            id: 3,
        });

        expect(Array.isArray(result)).toBeTruthy();
        expect(result).toHaveLength(0);
    });
});
