/*
* Copyright (C) 2019 Intel Corporation
* SPDX-License-Identifier: MIT
*/

/* global
    require:false
*/

(() => {
    const PluginRegistry = require('./plugins');
    const serverProxy = require('./server-proxy');
    const { ArgumentError } = require('./exceptions');
    const User = require('./user');

    /**
        * Class representing a project
        * @memberof module:API.cvat.classes
        * @hideconstructor
    */
    class Project {
        /**
            * In a fact you need use the constructor only if you want to create a project
            * @param {object} initialData - Object which is used for initialization
            * <br> It can contain keys:
            * <br> <li style="margin-left: 10px;"> name
            * <br> <li style="margin-left: 10px;"> owner
            * <br> <li style="margin-left: 10px;"> assignee
            * <br> <li style="margin-left: 10px;"> bug_tracker
        */
        constructor(initialData) {
            const data = {
                id: undefined,
                name: undefined,
                status: undefined,
                owner: undefined,
                assignee: undefined,
                created_date: undefined,
                updated_date: undefined,
                bug_tracker: undefined,
            };

            for (const prop in initialData) {
                if (Object.prototype.hasOwnProperty.call(data, prop)) {
                    data[prop] = initialData[prop];
                }
            }

            Object.defineProperties(this, Object.freeze({
                /**
                    * @name id
                    * @type {integer}
                    * @memberof module:API.cvat.classes.Project
                    * @readonly
                    * @instance
                */
                id: {
                    get: () => data.id,
                },
                /**
                    * @name name
                    * @type {string}
                    * @memberof module:API.cvat.classes.Project
                    * @instance
                    * @throws {module:API.cvat.exceptions.ArgumentError}
                */
                name: {
                    get: () => data.name,
                    set: (value) => {
                        if (!value.trim().length) {
                            throw new ArgumentError(
                                'Value must not be empty',
                            );
                        }
                        data.name = value;
                    },
                },
                /**
                    * @name status
                    * @type {module:API.cvat.enums.TaskStatus}
                    * @memberof module:API.cvat.classes.Project
                    * @readonly
                    * @instance
                */
                status: {
                    get: () => data.status,
                },
                /**
                    * Instance of a user who has created the project
                    * @name owner
                    * @type {module:API.cvat.classes.User}
                    * @memberof module:API.cvat.classes.Project
                    * @readonly
                    * @instance
                */
                owner: {
                    get: () => data.owner,
                },
                /**
                    * Instance of a user who is responsible for the project
                    * @name assignee
                    * @type {module:API.cvat.classes.User}
                    * @memberof module:API.cvat.classes.Project
                    * @instance
                    * @throws {module:API.cvat.exceptions.ArgumentError}
                */
                assignee: {
                    get: () => data.assignee,
                    set: (assignee) => {
                        if (assignee !== null && !(assignee instanceof User)) {
                            throw new ArgumentError(
                                'Value must be a user instance',
                            );
                        }
                        data.assignee = assignee;
                    },
                },
                /**
                    * @name createdDate
                    * @type {string}
                    * @memberof module:API.cvat.classes.Project
                    * @readonly
                    * @instance
                */
                createdDate: {
                    get: () => data.created_date,
                },
                /**
                    * @name updatedDate
                    * @type {string}
                    * @memberof module:API.cvat.classes.Project
                    * @readonly
                    * @instance
                */
                updatedDate: {
                    get: () => data.updated_date,
                },
                /**
                    * @name bugTracker
                    * @type {string}
                    * @memberof module:API.cvat.classes.Project
                    * @instance
                    * @throws {module:API.cvat.exceptions.ArgumentError}
                */
                bugTracker: {
                    get: () => data.bug_tracker,
                    set: (tracker) => {
                        data.bug_tracker = tracker;
                    },
                },
            }));
        }

        /**
            * Save the project on a server
            * @method save
            * @returns {module:API.cvat.classes.Project}
            * @memberof module:API.cvat.classes.Project
            * @readonly
            * @instance
            * @async
            * @throws {module:API.cvat.exceptions.ServerError}
            * @throws {module:API.cvat.exceptions.PluginError}
        */
        async save() {
            const result = await PluginRegistry
                .apiWrapper.call(this, Project.prototype.save);
            return result;
        }

        /**
            * Delete the project from a server
            * @method delete
            * @memberof module:API.cvat.classes.Project
            * @readonly
            * @instance
            * @async
            * @throws {module:API.cvat.exceptions.ServerError}
            * @throws {module:API.cvat.exceptions.PluginError}
        */
        async delete() {
            const result = await PluginRegistry
                .apiWrapper.call(this, Project.prototype.delete);
            return result;
        }
    }

    Project.prototype.save.implementation = async function () {
        // TODO: Add ability to change an owner and an assignee
        if (typeof (this.id) !== 'undefined') {
            // If the task has been already created, we update it
            const data = {
                owner: this.owner ? this.owner.id : null,
                assignee: this.assignee ? this.assignee.id : null,
                name: this.name,
                bug_tracker: this.bugTracker,
            };

            await serverProxy.projects.save(this.id, data);
            return this;
        }

        const data = {
            name: this.name,
        };

        if (typeof (this.bugTracker) !== 'undefined') {
            data.bug_tracker = this.bugTracker;
        }

        const project = await serverProxy.projects.create(data);
        return new Project(project);
    };

    Project.prototype.delete.implementation = async function () {
        const result = await serverProxy.projects.delete(this.id);
        return result;
    };

    module.exports = Project;
})();
