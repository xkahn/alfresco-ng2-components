/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 22/01/2015.
 */

/**
 * @module util
 */

/**
 * Provides constants used throughout the testing framework .
 *
 * @class util.Constants
 */
var exports = module.exports = {};

/**
 * Provides the User status options
 *
 * @property STATUS
 * @type {{ACTIVE: string, INACTIVE: string, PENDING: string, DELETED: string}}
 */
exports.STATUS = {
    ACTIVE: "active",
    INACTIVE: "inactive",
    PENDING: "pending",
    DELETED: "deleted"
};

/**
 * Provides the operating system as given by Node's process.platform
 *
 * @property OS
 * @type {{MACOS: darwin, LINUX: linux, WINDOWS: win32}}
 */
exports.OS = {
    MACOS: "darwin",
    LINUX: "linux",
    WINDOWS: "win32"
};

/**
 * Provides the User type options
 *
 * @property TYPE
 * @type {{TRIAL: string, ENTERPRISE: string}}
 */
exports.TYPE = {
    TRIAL: "trial",
    ENTERPRISE: "enterprise"
};

/**
 * Provides the possible editing actions inside the user management page.
 *
 * @property CHANGE_ACTIONS
 * @type {{DETAILS: string, STATUS: string, ACCOUNT_TYPE: string, TENANT: string, PASSWORD: string}}
 */
exports.CHANGE_ACTIONS = {
    DETAILS: "details",
    STATUS: "status",
    ACCOUNT_TYPE: "account type",
    TENANT: "tenant",
    PASSWORD: "password"
};

/**
 * Provides the possible capabilities for a group (UI displayed text and internal REST API codes).
 *
 * @property CAPABILITIES
 * @type {{MNG_MULTIPLE_TENANTS: string, ADM_TENANT_OF_GROUP: string, ACC_TECHNICAL_METRICS: string, ACC_REPORTS_ACTIVITI: string, ACC_ACTIVITI_EDITOR: string, ACC_ACTIVITI_REST_API: string}}
 */
exports.CAPABILITIES = {
    MNG_MULTIPLE_TENANTS: {
        UI_TEXT: 'Manage multiple tenants'
    },
    ADM_TENANT_OF_GROUP: {
        UI_TEXT: 'Administration of tenant of this group'
    },
    ACC_TECHNICAL_METRICS: {
        UI_TEXT: 'Access technical back-end metrics'
    },
    ACC_REPORTS_ACTIVITI: {
        UI_TEXT: 'Access reports in the Activiti task application'
    },
    ACC_ACTIVITI_EDITOR: {
        UI_TEXT: 'Access the Activiti Editor'
    },
    ACC_ACTIVITI_REST_API: {
        UI_TEXT: 'Access the REST API'
    },
    REST_API_MULTIPLE_TENANTS: {
        REST_API_CODE: 'tenant-mgmt-api',
    }
};

/**
 * Provides the field types that can be found inside a form
 *
 * @property FORM_FIELD_TYPES
 * @type {{SINGLE_LINE_TEXT: string, MULTI_LINE_TEXT: string, INTEGER: string, DATE: string, BOOLEAN: string, RADIO_BUTTONS: string, DROPDOWN: string, TYPEAHEAD: string, UPLOAD: string, READONLY: string, READONLY_TEXT: string, PEOPLE: string, FUNCTIONAL_GROUP: string, DYNAMIC_TABLE: string}}
 */
exports.FORM_FIELD_TYPES = {
    SINGLE_LINE_TEXT: "text",
    MULTI_LINE_TEXT: "multi-line-text",
    INTEGER: "integer",
    DATE: "date",
    BOOLEAN: "boolean",
    RADIO_BUTTONS: "radio-buttons",
    DROPDOWN: "dropdown",
    TYPEAHEAD: "typeahead",
    UPLOAD: "upload",
    READONLY: "readonly",
    READONLY_TEXT: "readonly-text",
    PEOPLE: "people",
    FUNCTIONAL_GROUP: "functional-group",
    DYNAMIC_TABLE: "dynamic-table"
};

/**
 * Provides the cell types for a dynamic table field
 * @type {{STRING: string, AMOUNT: string, NUMBER: string, DROPDOWN: string, BOOLEAN: string}}
 */
exports.DYNAMIC_TABLE_CELL_TYPES = {
    STRING: "string",
    AMOUNT: "amount",
    NUMBER: "number",
    DROPDOWN: "dropdown",
    BOOLEAN: "boolean"
};

/**
 * Provides the editor types
 * @type {{STEP: string, BPMN: string}}
 */
exports.EDITOR_TYPES = {
    STEP: "Step editor",
    BPMN: "BPMN editor"
};

/**
 * Provides the step types
 * @type {{HUMAN: string, EMAIL: string, CHOICE: string, SUBPROCESS: string, REST: string, PUBLISH_TO_ALFRESCO: string}}
 */
exports.STEP_TYPES = {
    HUMAN: "Human step",
    EMAIL: "Email step",
    CHOICE: "Choice step",
    SUBPROCESS: "Sub process step",
    REST: "REST call",
    PUBLISH_TO_ALFRESCO: "Publish to Alfresco",
    PUBLISH_TO_BOX: "Publish to Box",
    PUBLISH_TO_GOOGLE_DRIVE: "Publish to Google Drive",
    GENERATE_DOCUMENT: "Generate Document",
    DECISION_STEP: "Decision step",
    STORE_ENTITY_TASK: "Store entity task",
    END_STEP: "End step",
    USER_TASK: "User task"
};

/**
 * Provides the step types as seen in the editor
 */
exports.STEP_TYPES_EDITOR = {
    HUMAN: "userTask",
    STORE_ENTITY_TASK: "storeEntityTask",
    DECISION_TASK: "decisionTask"
};

/**
 * Tabs on Tenant Management page
 * @type {{LOGO: string, EVENTS: string, ALFRESCO_REPOSITORIES: string, ENDPOINTS: string, DOCUMENT_TEMPLATES: string}}
 */
exports.TENANT_MANAGEMENT_TABS = {
	LOGO: "Logo",
	EVENTS: "Events",
	ALFRESCO_REPOSITORIES: "Alfresco Repositories",
	ENDPOINTS: "Endpoints",
    DATA_SOURCES: "Data sources",
	DOCUMENT_TEMPLATES: "Document templates",
    CONFIG: "Config"
};

/*
 * Buttons on close modified decision table dialog
 */
exports.DECISION_TABLE_CLOSE_BUTTONS = {
	DISCARD_CHANGES: "Discard changes",
	SAVE_CHANGES: "Save changes",
	CONTINUE_EDITING: "Continue editing"
};

/*
 * REST API model type IDs
 */
exports.MODEL_TYPES = {
	BPMN20_PROCESS: 0,
	STEP_PROCESS: 1,
	FORM: 2,
	APP: 3,
	DECISION_TABLE: 4
};

/*
 * TestRail status id
 */
exports.TEST_RAIL_STATUS_ID = {
    PASSED: 1,
    BLOCKED: 2,
    UNTESTED: 3, // not allowed when adding a result
    RETEST: 4,
    FAILED: 5
};

/**
 *Rest API Response statusCodes
 */
exports.HTTP_RESPONSE_STATUS_CODE ={
    FORBIDDEN: 403,
    OK: 200,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404
};

/**
 *Rest API Response Messages
 */
exports.HTTP_RESPONSE_STATUS ={
    OK: {
        'CODE': 200,
        'MESSAGE': 'OK'
    },
    CREATED: {
        'CODE': 201,
        'MESSAGE': 'Created'
    },
    NO_CONTENT: {
        'CODE': 204,
        'MESSAGE': 'No Content'
    },
    NOT_FOUND: {
        'CODE': 404,
        'MESSAGE': 'Not Found'
    }
};

/**
 *Rest API HTTP content types
 */
exports.HTTP_CONTENT_TYPE = {
    JSON : 'application/json',
    URLENCODED : 'application/x-www-form-urlencoded',
    IMAGE_PNG: 'image/png',
    TEXT: 'text/csv'
};

exports.EDIT_FORM_TABS = {
    GENERAL: "General",
    ADVANCED: "Advanced",
    VISIBILITY: "Visibility",
    STYLE: "Style"
};

exports.TASK_PROPERTIES_TITLES = {
    SCRIPT: "Script text of the script task."
};

exports.FORM_JS_EVENT_TYPE = {
    FORM_RENDERED: "formRendered"
};

exports.PROCESSES_FILTER = {
    MY_PROCESSES: "My processes"
};

exports.FORMS_FILTER = {
    MY_REUSABLE_FORMS: "My reusable forms"
};

exports.DECISION_TABLES_FILTER = {
    MY_REUSABLE_DECISION_TABLES: "My reusable decision tables"
};

exports.APPS_FILTER = {
    MY_APP_DEFINITIONS: "My app definitions"
};

exports.DATA_MODELS_FILTER = {
    MY_DATA_MODELS: "My data models"
};

exports.STENCILS_FILTER = {
    MY_STENCILS: "My stencils"
};

exports.COMMON_FILTERS = {
    SHARED_WITH_ME: "Shared with Me",
    SHARED_WITH_OTHERS: "Shared with others",
    FAVORITED: "Favorited",
    EVERYONES: "Everyone's"
};

exports.VARIABLE_TYPE = {
    SERIALIZABLE: "serializable",
    STRING: "string"
};

exports.GROUPS = {
    APP_DESIGNER: 'app-designer-users',
    ANALYTICS_USERS: 'analytics-users'
};

exports.APPLICATION = {
    ADF_APS: 'adf_aps',
    ADF_ACS: 'adf_acs',
    APS: 'main'
};

exports.TASKFILTERS = {
    MY_TASKS: 'My Tasks',
    INV_TASKS: 'Involved Tasks',
    QUE_TASKS: 'Queued Tasks',
    COMPL_TASKS: 'Completed Tasks'
};

exports.TASKDETAILS = {
    NO_FORM: 'No form',
    NO_PARENT: 'No parent',
    NO_DATE: 'No date',
    NO_CATEGORY: 'No category'
};

exports.TASKSTATUS = {
    RUNNING: 'Running'
};

exports.TASKDATAFORMAT = "mmm dd yyyy";

exports.METADATA = {
    DATAFORMAT: "mmm dd yyyy",
    TITLE: "Details",
    COMMENTS_TAB: "COMMENTS",
    PROPERTY_TAB: "PROPERTIES",
    VERSIONS_TAB: "VERSIONS",
    DEFAULT_ASPECT: "Properties",
    MORE_INFO_BUTTON: "More information",
    LESS_INFO_BUTTON: "Less information",
    ARROW_DOWN: "keyboard_arrow_down",
    ARROW_UP: "keyboard_arrow_up",
    EDIT_BUTTON_TOOLTIP: "Edit"
};

exports.THEMING = {
    PINK_BLUE_DARK: "Pink Bluegrey Dark",
    DEFAULT_PASSWORD_ICON_COLOR: "rgba(0, 0, 0, 0.87)",
    DEFAULT_LOGIN_BUTTON_COLOR: "rgba(0, 0, 0, 0.38)",
    DEFAULT_BACKGROUND_COLOR: "rgba(0, 0, 0, 0.87)",
    PINK_BLUE_DARK_PASSWORD_ICON_COLOR: "rgba(255, 255, 255, 1)",
    PINK_BLUE_DARK_LOGIN_BUTTON_COLOR: "rgba(255, 255, 255, 0.87)",
    PINK_BLUE_DARK_BACKGROUND_COLOR: "rgba(255, 255, 255, 1)",
};

exports.PROCESSENDDATE = "No date";

exports.PROCESSCATEGORY = "http://www.activiti.org/processdef";

exports.PROCESSBUSINESSKEY = "None";

exports.PROCESSDESCRIPTION = "No description";

exports.PROCESSDATEFORMAT = "mmm dd yyyy";

exports.PROCESSSTATUS = {
    RUNNING: 'Running',
    COMPLETED: 'Completed'
};

exports.DEFAULT_REPORTS = {
    HEAT_MAP: 'Process definition heat map',
    PROCESS_DEF_OVERVIEW: 'Process definition overview',
    PROCESS_INSTANCE_OVERVIEW: 'Process instances overview',
    TASK_OVERVIEW: 'Task overview',
    TASK_SERVICE_LEVEL_AGREEMENT: 'Task service level agreement'
};
